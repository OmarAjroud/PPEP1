<?php

namespace App\Controller;

use App\Entity\Candidature;
use App\Repository\CandidatureRepository;
use App\Repository\OffreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/candidate')]
class CandidatureController extends AbstractController
{
    #[Route('/candidature/create', name: 'api_candidature_create', methods: ['POST'])]
    public function create(
        Request $request,
        OffreRepository $offreRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $user = $this->getUser();
        
        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        // Robust Parameter Extraction for 'candidature[offre]'
        $reqData = $request->request->all();
        $queryData = $request->query->all();
        
        $offerId = null;

        // 1. Check Body (Post Data) - Array Style (Standard PHP parsing)
        if (isset($reqData['candidature']) && is_array($reqData['candidature']) && isset($reqData['candidature']['offre'])) {
            $offerId = $reqData['candidature']['offre'];
        }
        // 2. Check Body - Flat Key Style (Raw FormData sometimes)
        elseif (isset($reqData['candidature[offre]'])) {
             $offerId = $reqData['candidature[offre]'];
        }
        // 3. Check Query - Array Style
        elseif (isset($queryData['candidature']) && is_array($queryData['candidature']) && isset($queryData['candidature']['offre'])) {
             $offerId = $queryData['candidature']['offre'];
        }
        // 4. Check Query - Flat Key Style
        elseif (isset($queryData['candidature[offre]'])) {
             $offerId = $queryData['candidature[offre]'];
        }
        
        if (!$offerId) {
             // Fallback: Check if it's just 'candidature' or 'offre' (loose)
             $offerId = $request->get('offre') ?? $request->get('id') ?? null;
        }

        if (!$offerId) {
            return $this->json(['error' => 'Offre ID required.'], 400);
        }

        $offre = $offreRepository->find($offerId);

        if (!$offre) {
            return $this->json(['error' => 'Offre not found'], 404);
        }

        $candidature = new Candidature();
        $candidature->setUser($user);
        $candidature->setOffre($offre);
        $candidature->setEtat('draft');

        $em->persist($candidature);
        $em->flush();

        return $this->json([
            'success' => true,
            'id' => $candidature->getId(),
            'message' => 'Candidature created successfully'
        ]);
    }

    #[Route('/candidatures/historique', name: 'api_candidature_history', methods: ['GET'])]
    public function history(CandidatureRepository $candidatureRepository): JsonResponse
    {
        $user = $this->getUser();
        
        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        $candidatures = $candidatureRepository->findBy(['user' => $user]);

        $data = array_map(function (Candidature $candidature) {
            $offre = $candidature->getOffre();
            return [
                'id' => $candidature->getId(),
                'dateCandidature' => $candidature->getDateCandidature()->format('Y-m-d H:i:s'),
                'etat' => $candidature->getEtat(),
                'etatnumerique' => $candidature->getEtatNumerique(),
                'offre' => [
                    'id' => $offre->getId(),
                    'specialite' => $offre->getSpecialite() ? $offre->getSpecialite()->getLibelle() : '',
                    'centre' => $offre->getCentre() ? $offre->getCentre()->getNom() : '',
                    'diplome' => $offre->getDiplome() ? $offre->getDiplome()->getLibelle() : '',
                    'debutformation' => $offre->getDebutformation()?->format('Y-m-d'),
                    'finformation' => $offre->getFinformation()?->format('Y-m-d'),
                    'session' => $offre->getSession(),
                    'hebergement' => $offre->getHebergement(),
                    'bourse' => $offre->getBourse(),
                    'nbplaces' => $offre->getNbplaces(),
                ],
            ];
        }, $candidatures);

        return $this->json($data);
    }

    #[Route('/candidature/validateMany', name: 'api_candidature_validate_many', methods: ['POST'])]
    public function validateMany(Request $request, CandidatureRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) return $this->json(['error' => 'Unauthorized'], 401);

        $data = json_decode($request->getContent(), true);
        $ids = $data['candidatures'] ?? [];

        if (empty($ids)) {
            return $this->json(['error' => 'No IDs provided'], 400);
        }

        foreach ($ids as $id) {
            $candidature = $repo->find($id);
            if ($candidature && $candidature->getUser() === $user) {
                $candidature->setEtat('valide'); 
                $em->persist($candidature);
            }
        }
        $em->flush();

        return $this->json(['success' => true]);
    }

    #[Route('/candidature/offre/{id}', name: 'api_candidature_delete_by_offre', methods: ['DELETE'])]
    public function deleteDraft(int $id, OffreRepository $offreRepo, CandidatureRepository $candRepo, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) return $this->json(['error' => 'Unauthorized'], 401);

        // Find candidature for this offer and user
        $offre = $offreRepo->find($id);
        if (!$offre) return $this->json(['error' => 'Offre not found'], 404);

        $candidature = $candRepo->findOneBy(['user' => $user, 'offre' => $offre]);

        if ($candidature) {
            $em->remove($candidature);
            $em->flush();
        }

        return $this->json(['success' => true]);
    }
}
