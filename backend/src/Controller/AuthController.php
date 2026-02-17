<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    #[Route('/api/login_check', name: 'api_login', methods: ['POST'])]
    public function login(): JsonResponse
    {
        return $this->json(['message' => 'Login handled by JWT']);
    }

    #[Route('/public/candidate/inscription', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $em
    ): JsonResponse {
        // Handle FormData (Nested structure)
        $data = $request->request->all();
        $files = $request->files->all(); // Handle file uploads

        // Extract Candidate Data
        $candidateData = $data['candidate'] ?? null;
        $donneeData = $data['donnee_personnelle'] ?? null;
        $extraitData = $data['extrais'] ?? null;
        $educationData = $data['formation'] ?? null;
        $prevTrainingData = $data['ancienne_formation'] ?? null;

        if (!$candidateData || !isset($candidateData['email']) || !isset($candidateData['plainPassword']['first'])) {
            return $this->json(['error' => 'Email and Password are required.'], 400);
        }

        $email = $candidateData['email'];
        $password = $candidateData['plainPassword']['first'];

        // Check availability
        $existing = $em->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($existing) {
            return $this->json(['error' => 'Email already exists.'], 409);
        }

        // 1. Create User
        $user = new User();
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, $password));
        $user->setRoles(['ROLE_CANDIDATE']); // Assume ROLE_CANDIDATE exists or use default

        if (!empty($candidateData['cin'])) $user->setCin($candidateData['cin']);
        if (!empty($candidateData['nomAr'])) $user->setNom($candidateData['nomAr']);
        if (!empty($candidateData['prenomAr'])) $user->setPrenom($candidateData['prenomAr']);
        if (!empty($donneeData['TelMobile'])) $user->setTelMobile($donneeData['TelMobile']);
        if (!empty($donneeData['Adresse'])) $user->setAdresse($donneeData['Adresse']);
        if (!empty($donneeData['CodePostal'])) $user->setCodePostal($donneeData['CodePostal']);

        $em->persist($user);

        // 2. Create Candidate
        $candidate = new \App\Entity\Candidate();
        $candidate->setUser($user);

        // Map Extrait Data
        if ($extraitData) {
            if (!empty($extraitData['NumInscription'])) $candidate->setNumInscription($extraitData['NumInscription']);
            if (!empty($extraitData['Annee'])) $candidate->setAnneeNaissance((int)$extraitData['Annee']);
            if (!empty($extraitData['Municipalite'])) {
                $mun = $em->getRepository(\App\Entity\Municipalite::class)->find($extraitData['Municipalite']);
                if ($mun) $candidate->setLieuNaissance($mun);
            }
            // Gov Birth not sent? Form sends govBread but creates MunBread.
            // But we can infer Gov from Mun? Or rely on what's sent.
            // Form sends 'extrais[Municipalite]' as ID.
        }

        // Handle File Upload (ExtraitDeNaissance)
        if (isset($files['extrais']) && isset($files['extrais']['ExtraitDeNaissance'])) {
            /** @var \Symfony\Component\HttpFoundation\File\UploadedFile $file */
            $file = $files['extrais']['ExtraitDeNaissance'];
            if ($file) {
                $newFilename = uniqid().'.'.$file->guessExtension();
                try {
                    $file->move(
                        $this->getParameter('kernel.project_dir') . '/public/uploads/extraits',
                        $newFilename
                    );
                    $candidate->setExtraitNaissancePath('uploads/extraits/' . $newFilename);
                } catch (\Exception $e) {
                    // Log error but continue
                }
            }
        }

        // Map Personal Data
        if ($donneeData) {
            if (!empty($donneeData['Genre'])) $candidate->setGenre($donneeData['Genre']);
            if (!empty($donneeData['Adresse'])) $candidate->setAdresse($donneeData['Adresse']);
            if (!empty($donneeData['CodePostal'])) $candidate->setCodePostal($donneeData['CodePostal']);
            if (!empty($donneeData['TelFixe'])) $candidate->setTelFixe($donneeData['TelFixe']);
            if (!empty($donneeData['DateNaissance'])) {
                try {
                    $candidate->setDateNaissance(new \DateTime($donneeData['DateNaissance']));
                } catch (\Exception $e) {}
            }
            if (!empty($donneeData['Gouvernorat'])) {
                $gov = $em->getRepository(\App\Entity\Gouvernorat::class)->find($donneeData['Gouvernorat']);
                if ($gov) $candidate->setGouvernorat($gov);
            }
            if (!empty($donneeData['Delegation'])) {
                $del = $em->getRepository(\App\Entity\Delegation::class)->find($donneeData['Delegation']);
                if ($del) $candidate->setDelegation($del);
            }
        }

        // Map Education (Formation)
        if ($educationData) {
            if (!empty($educationData['Etablissement'])) $candidate->setEtablissement($educationData['Etablissement']);
            if (!empty($educationData['TypeEtablissement'])) $candidate->setTypeEtablissement($educationData['TypeEtablissement']);
            if (!empty($educationData['AnneeAbandonScolaire'])) $candidate->setAnneeAbandon((int)$educationData['AnneeAbandonScolaire']);
            
            if (!empty($educationData['NiveauScolaire'])) {
                $niv = $em->getRepository(\App\Entity\NiveauScolaire::class)->find($educationData['NiveauScolaire']);
                $candidate->setNiveauScolaire($niv);
            }
            if (!empty($educationData['deplome'])) {
                 $dip = $em->getRepository(\App\Entity\Diplome::class)->find($educationData['deplome']);
                 $candidate->setDiplome($dip);
            }
            if (!empty($educationData['speciality'])) {
                 $spec = $em->getRepository(\App\Entity\Specialite::class)->find($educationData['speciality']);
                 $candidate->setSpecialite($spec);
            }
        }
        
        // Map Previous Training
        if ($prevTrainingData) {
            $candidate->setHasPreviousTraining(true);
            if (!empty($prevTrainingData['anneeFin'])) $candidate->setPreviousAnneeFin((int)$prevTrainingData['anneeFin']);
            
            if (!empty($prevTrainingData['diplome'])) {
                $dip = $em->getRepository(\App\Entity\Diplome::class)->find($prevTrainingData['diplome']);
                $candidate->setPreviousDiplome($dip);
            }
            if (!empty($prevTrainingData['Specialite'])) {
                $spec = $em->getRepository(\App\Entity\Specialite::class)->find($prevTrainingData['Specialite']);
                $candidate->setPreviousSpecialite($spec);
            }
            if (!empty($prevTrainingData['Centre'])) {
                $ctr = $em->getRepository(\App\Entity\Centre::class)->find($prevTrainingData['Centre']);
                $candidate->setPreviousCentre($ctr);
            }
        }

        $em->persist($candidate);
        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'User registered successfully with profile.',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail()
            ]
        ], 201);
    }

    #[Route('/api/candidate/profile', name: 'api_profile', methods: ['GET'])]
    public function profile(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'cin' => $user->getCin(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'telMobile' => $user->getTelMobile(),
            'adresse' => $user->getAdresse(),
            'codePostal' => $user->getCodePostal(),
        ]);
    }
}
