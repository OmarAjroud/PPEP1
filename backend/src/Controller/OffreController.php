<?php

namespace App\Controller;

use App\Entity\Offre;
use App\Repository\OffreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class OffreController extends AbstractController
{
    #[Route('/offres', name: 'api_offres_search', methods: ['POST', 'GET'])]
    public function search(Request $request, OffreRepository $offreRepository): JsonResponse
    {
        // Get query parameters
        $specialite = $request->query->get('specialite_refIn') ?? $request->request->get('specialite_refIn');
        $centre = $request->query->get('centre_refIn') ?? $request->request->get('centre_refIn');
        $start = (int) ($request->query->get('start') ?? $request->request->get('start', 0));
        $length = (int) ($request->query->get('length') ?? $request->request->get('length', 10));

        // Build query
        $qb = $offreRepository->createQueryBuilder('o');

        if ($specialite) {
            $qb->andWhere('o.specialite LIKE :specialite')
               ->setParameter('specialite', '%' . $specialite . '%');
        }

        if ($centre) {
            $qb->andWhere('o.centre LIKE :centre')
               ->setParameter('centre', '%' . $centre . '%');
        }

        $qb->setFirstResult($start)
           ->setMaxResults($length);

        $offres = $qb->getQuery()->getResult();

        // Transform to array
        $data = array_map(function (Offre $offre) {
            return [
                'id' => $offre->getId(),
                'specialite' => $offre->getSpecialite(),
                'centre' => $offre->getCentre(),
                'diplome' => $offre->getDiplome(),
                'debutformation' => $offre->getDebutformation()?->format('Y-m-d'),
                'finformation' => $offre->getFinformation()?->format('Y-m-d'),
                'nbplaces' => $offre->getNbplaces(),
                'foyer' => $offre->getFoyer(),
                'hebergement' => $offre->getHebergement(),
                'bourse' => $offre->getBourse(),
                'etat' => $offre->getEtat(),
                'etatnumerique' => $offre->getEtatnumerique(),
                'session' => $offre->getSession(),
                'code' => $offre->getCode(),
            ];
        }, $offres);

        return $this->json($data);
    }

    #[Route('/offres/{id}', name: 'api_offres_get', methods: ['GET'])]
    public function get(int $id, OffreRepository $offreRepository): JsonResponse
    {
        $offre = $offreRepository->find($id);

        if (!$offre) {
            return $this->json(['error' => 'Offre not found'], 404);
        }

        return $this->json([
            'id' => $offre->getId(),
            'specialite' => $offre->getSpecialite(),
            'centre' => $offre->getCentre(),
            'diplome' => $offre->getDiplome(),
            'debutformation' => $offre->getDebutformation()?->format('Y-m-d'),
            'finformation' => $offre->getFinformation()?->format('Y-m-d'),
            'nbplaces' => $offre->getNbplaces(),
            'foyer' => $offre->getFoyer(),
            'hebergement' => $offre->getHebergement(),
            'bourse' => $offre->getBourse(),
            'etat' => $offre->getEtat(),
            'etatnumerique' => $offre->getEtatnumerique(),
            'session' => $offre->getSession(),
            'code' => $offre->getCode(),
        ]);
    }
}
