<?php

namespace App\Controller;

use App\Entity\Candidature;
use App\Entity\Offre;
use App\Repository\CandidatureRepository;
use App\Repository\CentreRepository;
use App\Repository\DiplomeRepository;
use App\Repository\OffreRepository;
use App\Repository\SpecialiteRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/admin')]
#[IsGranted('ROLE_ADMIN')]
class AdminController extends AbstractController
{
    // ─── STATS ───────────────────────────────────────────────

    #[Route('/stats', name: 'admin_stats', methods: ['GET'])]
    public function stats(
        UserRepository $userRepo,
        CandidatureRepository $candRepo,
        OffreRepository $offreRepo
    ): JsonResponse {
        $totalUsers = $userRepo->count([]);
        $totalOffres = $offreRepo->count([]);
        $totalCandidatures = $candRepo->count([]);

        $pending = $candRepo->count(['etat' => 'en_attente']);
        $accepted = $candRepo->count(['etat' => 'accepte']);
        $rejected = $candRepo->count(['etat' => 'refuse']);
        $draft = $candRepo->count(['etat' => 'draft']);

        return $this->json([
            'users' => $totalUsers,
            'offres' => $totalOffres,
            'candidatures' => $totalCandidatures,
            'pending' => $pending,
            'accepted' => $accepted,
            'rejected' => $rejected,
            'draft' => $draft,
        ]);
    }

    // ─── CANDIDATURES ────────────────────────────────────────

    #[Route('/candidatures', name: 'admin_candidatures', methods: ['GET'])]
    public function listCandidatures(CandidatureRepository $candRepo): JsonResponse
    {
        $all = $candRepo->findAll();

        $data = array_map(function (Candidature $c) {
            $user = $c->getUser();
            $offre = $c->getOffre();
            return [
                'id' => $c->getId(),
                'etat' => $c->getEtat(),
                'dateCandidature' => $c->getDateCandidature()?->format('Y-m-d H:i'),
                'user' => [
                    'id' => $user?->getId(),
                    'nom' => $user?->getNom(),
                    'prenom' => $user?->getPrenom(),
                    'email' => $user?->getEmail(),
                ],
                'offre' => [
                    'id' => $offre?->getId(),
                    'specialite' => $offre?->getSpecialite()?->getLibelle(),
                    'centre' => $offre?->getCentre()?->getNom(),
                    'diplome' => $offre?->getDiplome()?->getLibelle(),
                ],
            ];
        }, $all);

        return $this->json($data);
    }

    #[Route('/candidature/{id}/accept', name: 'admin_candidature_accept', methods: ['PUT'])]
    public function acceptCandidature(int $id, CandidatureRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $c = $repo->find($id);
        if (!$c) return $this->json(['error' => 'Not found'], 404);

        $c->setEtat('accepte');
        $em->flush();

        return $this->json(['success' => true, 'etat' => 'accepte']);
    }

    #[Route('/candidature/{id}/reject', name: 'admin_candidature_reject', methods: ['PUT'])]
    public function rejectCandidature(int $id, CandidatureRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $c = $repo->find($id);
        if (!$c) return $this->json(['error' => 'Not found'], 404);

        $c->setEtat('refuse');
        $em->flush();

        return $this->json(['success' => true, 'etat' => 'refuse']);
    }

    #[Route('/candidature/{id}', name: 'admin_candidature_delete', methods: ['DELETE'])]
    public function deleteCandidature(int $id, CandidatureRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $c = $repo->find($id);
        if (!$c) return $this->json(['error' => 'Not found'], 404);

        $em->remove($c);
        $em->flush();

        return $this->json(['success' => true]);
    }

    // ─── OFFRES ──────────────────────────────────────────────

    #[Route('/offres', name: 'admin_offres', methods: ['GET'])]
    public function listOffres(OffreRepository $offreRepo): JsonResponse
    {
        $all = $offreRepo->findAll();

        $data = array_map(function (Offre $o) {
            return [
                'id' => $o->getId(),
                'specialite' => $o->getSpecialite()?->getLibelle(),
                'specialite_id' => $o->getSpecialite()?->getId(),
                'centre' => $o->getCentre()?->getNom(),
                'centre_id' => $o->getCentre()?->getId(),
                'diplome' => $o->getDiplome()?->getLibelle(),
                'diplome_id' => $o->getDiplome()?->getId(),
                'debutformation' => $o->getDebutformation()?->format('Y-m-d'),
                'finformation' => $o->getFinformation()?->format('Y-m-d'),
                'nbplaces' => $o->getNbplaces(),
                'foyer' => $o->getFoyer(),
                'hebergement' => $o->getHebergement(),
                'bourse' => $o->getBourse(),
                'etat' => $o->getEtat(),
                'session' => $o->getSession(),
                'code' => $o->getCode(),
                'candidatures_count' => $o->getCandidatures()->count(),
            ];
        }, $all);

        return $this->json($data);
    }

    #[Route('/offre', name: 'admin_offre_create', methods: ['POST'])]
    public function createOffre(
        Request $request,
        SpecialiteRepository $specRepo,
        CentreRepository $centreRepo,
        DiplomeRepository $dipRepo,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $offre = new Offre();
        $this->hydrateOffre($offre, $data, $specRepo, $centreRepo, $dipRepo);

        $em->persist($offre);
        $em->flush();

        return $this->json(['success' => true, 'id' => $offre->getId()], 201);
    }

    #[Route('/offre/{id}', name: 'admin_offre_update', methods: ['PUT'])]
    public function updateOffre(
        int $id,
        Request $request,
        OffreRepository $offreRepo,
        SpecialiteRepository $specRepo,
        CentreRepository $centreRepo,
        DiplomeRepository $dipRepo,
        EntityManagerInterface $em
    ): JsonResponse {
        $offre = $offreRepo->find($id);
        if (!$offre) return $this->json(['error' => 'Not found'], 404);

        $data = json_decode($request->getContent(), true);
        $this->hydrateOffre($offre, $data, $specRepo, $centreRepo, $dipRepo);

        $em->flush();

        return $this->json(['success' => true]);
    }

    #[Route('/offre/{id}', name: 'admin_offre_delete', methods: ['DELETE'])]
    public function deleteOffre(int $id, OffreRepository $offreRepo, EntityManagerInterface $em): JsonResponse
    {
        $offre = $offreRepo->find($id);
        if (!$offre) return $this->json(['error' => 'Not found'], 404);

        $em->remove($offre);
        $em->flush();

        return $this->json(['success' => true]);
    }

    private function hydrateOffre(
        Offre $offre,
        array $data,
        SpecialiteRepository $specRepo,
        CentreRepository $centreRepo,
        DiplomeRepository $dipRepo
    ): void {
        if (isset($data['specialite_id'])) {
            $offre->setSpecialite($specRepo->find($data['specialite_id']));
        }
        if (isset($data['centre_id'])) {
            $offre->setCentre($centreRepo->find($data['centre_id']));
        }
        if (isset($data['diplome_id'])) {
            $offre->setDiplome($dipRepo->find($data['diplome_id']));
        }
        if (isset($data['debutformation'])) {
            $offre->setDebutformation(new \DateTime($data['debutformation']));
        }
        if (isset($data['finformation'])) {
            $offre->setFinformation(new \DateTime($data['finformation']));
        }
        if (isset($data['nbplaces'])) $offre->setNbplaces((int)$data['nbplaces']);
        if (isset($data['foyer'])) $offre->setFoyer($data['foyer']);
        if (isset($data['hebergement'])) $offre->setHebergement($data['hebergement']);
        if (isset($data['bourse'])) $offre->setBourse($data['bourse']);
        if (isset($data['etat'])) $offre->setEtat($data['etat']);
        if (isset($data['session'])) $offre->setSession($data['session']);
        if (isset($data['code'])) $offre->setCode($data['code']);
    }

    // ─── USERS ───────────────────────────────────────────────

    #[Route('/users', name: 'admin_users', methods: ['GET'])]
    public function listUsers(UserRepository $userRepo): JsonResponse
    {
        $all = $userRepo->findAll();

        $data = array_map(function ($user) {
            return [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'email' => $user->getEmail(),
                'cin' => $user->getCin(),
                'tel' => $user->getTelMobile(),
                'roles' => $user->getRoles(),
                'candidatures_count' => $user->getCandidatures()->count(),
            ];
        }, $all);

        return $this->json($data);
    }

    #[Route('/user/{id}', name: 'admin_user_delete', methods: ['DELETE'])]
    public function deleteUser(int $id, UserRepository $userRepo, EntityManagerInterface $em): JsonResponse
    {
        $user = $userRepo->find($id);
        if (!$user) return $this->json(['error' => 'Not found'], 404);

        // Don't allow deleting yourself
        if ($user === $this->getUser()) {
            return $this->json(['error' => 'Cannot delete your own account'], 400);
        }

        $em->remove($user);
        $em->flush();

        return $this->json(['success' => true]);
    }
}
