<?php

namespace App\Controller;

use App\Repository\GouvernoratRepository;
use App\Repository\DelegationRepository;
use App\Repository\MunicipaliteRepository;
use App\Repository\NiveauScolaireRepository;
use App\Repository\DiplomeRepository;
use App\Repository\SpecialiteRepository;
use App\Repository\CandidateRepository;
use App\Repository\CentreRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/public')]
class ReferenceController extends AbstractController
{
    #[Route('/gouvernorats', name: 'public_gouvernorats', methods: ['GET'])]
    public function getGouvernorats(GouvernoratRepository $repo): JsonResponse
    {
        $data = $repo->findAll();
        // Frontend expects libelle_Ar
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle() // Fallback
        ], $data);
        return $this->json($result);
    }

    #[Route('/delegations/{govId}', name: 'public_delegations_by_gov', methods: ['GET'])]
    public function getDelegations(int $govId, DelegationRepository $repo): JsonResponse
    {
        $data = $repo->findBy(['gouvernorat' => $govId]);
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle()
        ], $data);
        return $this->json($result);
    }

    #[Route('/municipalites/gouvernorat/{govId}', name: 'public_municipalites_by_gov', methods: ['GET'])]
    public function getMunicipalitiesByGov(int $govId, MunicipaliteRepository $repo): JsonResponse
    {
        $data = $repo->findBy(['gouvernorat' => $govId]);
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle()
        ], $data);
        return $this->json($result);
    }

    #[Route('/municipalites/{delId}', name: 'public_municipalites_by_del', methods: ['GET'])]
    public function getMunicipalitiesByDel(int $delId, MunicipaliteRepository $repo): JsonResponse
    {
        $data = $repo->findBy(['delegation' => $delId]);
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle()
        ], $data);
        return $this->json($result);
    }

    #[Route('/niveaux', name: 'public_niveaux', methods: ['GET'])]
    public function getNiveaux(NiveauScolaireRepository $repo): JsonResponse
    {
        $data = $repo->findAll();
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle()
        ], $data);
        return $this->json($result);
    }

    #[Route('/specialiteScolaire', name: 'public_specialite_scolaire', methods: ['GET'])]
    public function getSpecialiteScolaire(SpecialiteRepository $repo): JsonResponse
    {
        $data = $repo->findAll();
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle()
        ], $data);
        return $this->json($result);
    }

    #[Route('/specialites', name: 'public_specialites', methods: ['GET'])]
    public function getSpecialites(SpecialiteRepository $repo): JsonResponse
    {
        $data = $repo->findAll();
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle()
        ], $data);
        return $this->json($result);
    }

    #[Route('/specialites/diplome/{id}', name: 'public_specialites_by_diplome', methods: ['GET'])]
    public function getSpecialitesByDiplome(int $id, SpecialiteRepository $repo): JsonResponse
    {
        $data = $repo->findBy(['diplome' => $id]);
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle()
        ], $data);
        return $this->json($result);
    }

    #[Route('/diplomes', name: 'public_diplomes', methods: ['GET'])]
    public function getDiplomes(DiplomeRepository $repo): JsonResponse
    {
        $data = $repo->findAll();
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle()
        ], $data);
        return $this->json($result);
    }
    
    #[Route('/diplomesFormation', name: 'public_diplomes_formation', methods: ['GET'])]
    public function getDiplomesFormation(DiplomeRepository $repo): JsonResponse
    {
        $data = $repo->findAll();
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'libelle' => $item->getLibelle(),
            'libelle_Ar' => $item->getLibelle()
        ], $data);
        return $this->json($result);
    }

    #[Route('/centres', name: 'public_centres', methods: ['GET'])]
    public function getCentres(CentreRepository $repo): JsonResponse
    {
        $data = $repo->findAll();
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'nom' => $item->getNom(),
            'libelle_Ar' => $item->getNom() // Map nom to libelle_Ar
        ], $data);
        return $this->json($result);
    }
    
    #[Route('/centres/specialite/{id}', name: 'public_centres_by_spec', methods: ['GET'])]
    public function getCentresBySpecialite(int $id, CentreRepository $repo): JsonResponse
    {
        $qb = $repo->createQueryBuilder('c');
        $qb->join('c.specialites', 's')
           ->where('s.id = :specId')
           ->setParameter('specId', $id);
           
        $data = $qb->getQuery()->getResult();
        
        $result = array_map(fn($item) => [
            'id' => $item->getId(), 
            'nom' => $item->getNom(),
            'libelle_Ar' => $item->getNom()
        ], $data);
        return $this->json($result);
    }

    // --- Validation APIs ---

    #[Route('/candidate/CheckMail/{email}', name: 'check_email', methods: ['GET'])]
    public function checkEmail(string $email, UserRepository $repo): JsonResponse
    {
        $user = $repo->findOneBy(['email' => $email]);
        return $this->json(['exist' => $user !== null]);
    }

    #[Route('/candidate/CheckIdentifiant/{annee}/{num}/{mun}', name: 'check_identifiant', methods: ['GET'])]
    public function checkIdentifiant(int $annee, string $num, int $mun, CandidateRepository $repo): JsonResponse
    {
        // Check if candidate exists with these birth details
        // We need to query Candidate entity.
        // For now, simpler check or mock. 
        // Real check:
        $exists = $repo->findOneBy([
            'anneeNaissance' => $annee,
            'numInscription' => $num
            // 'lieuNaissance' => $mun // storing object, need entity ref or match id
        ]);
        
        return $this->json(['exist' => $exists !== null]);
    }
}
