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

        $offerId = $request->request->get('candidature')['offre'] ?? $request->query->get('candidature')['offre'] ?? null;

        if (!$offerId) {
            return $this->json(['error' => 'Offre ID required'], 400);
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
                'etatNumerique' => $candidature->getEtatNumerique(),
                'offre' => [
                    'id' => $offre->getId(),
                    'specialite' => $offre->getSpecialite(),
                    'centre' => $offre->getCentre(),
                    'diplome' => $offre->getDiplome(),
                    'debutformation' => $offre->getDebutformation()?->format('Y-m-d'),
                ],
            ];
        }, $candidatures);

        return $this->json($data);
    }
}
