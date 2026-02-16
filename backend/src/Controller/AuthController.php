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
        // $request->request->all() returns array from $_POST

        // Extract Candidate Data
        $candidateData = $data['candidate'] ?? null;
        $donneeData = $data['donnee_personnelle'] ?? null;

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

        // Create User
        $user = new User();
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, $password));

        // Map other fields from 'candidate'
        if (!empty($candidateData['cin'])) $user->setCin($candidateData['cin']);
        if (!empty($candidateData['nomAr'])) $user->setNom($candidateData['nomAr']); // Mapping nomAr to Nom
        if (!empty($candidateData['prenomAr'])) $user->setPrenom($candidateData['prenomAr']); // Mapping prenomAr to Prenom

        // Map fields from 'donnee_personnelle'
        if ($donneeData) {
            if (!empty($donneeData['TelMobile'])) $user->setTelMobile($donneeData['TelMobile']);
            if (!empty($donneeData['Adresse'])) $user->setAdresse($donneeData['Adresse']);
            if (!empty($donneeData['CodePostal'])) $user->setCodePostal($donneeData['CodePostal']);
        }

        // Note: Ignoring 'extrais' (File), 'formation', 'ancienne_formation' as User entity cannot store them.
        
        $em->persist($user);
        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'User registered successfully',
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
