<?php

namespace App\Entity;

use App\Repository\CandidateRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CandidateRepository::class)]
class Candidate
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'candidate', targetEntity: User::class, cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    // --- Birth Details ---
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $numInscription = null;

    #[ORM\Column(nullable: true)]
    private ?int $anneeNaissance = null;

    #[ORM\ManyToOne]
    private ?Municipalite $lieuNaissance = null;

    #[ORM\ManyToOne]
    private ?Gouvernorat $gouvernoratNaissance = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateNaissance = null; // Also in User? Let's keep master here if specific.

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $genre = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $extraitNaissancePath = null;

    // --- Address & Contact (Detailed) ---
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adresse = null;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $codePostal = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $telFixe = null;
    
    // telMobile is in User, but allow here if needed? No, use User's.

    #[ORM\ManyToOne]
    private ?Gouvernorat $gouvernorat = null;

    #[ORM\ManyToOne]
    private ?Delegation $delegation = null;

    // --- Education ---
    #[ORM\ManyToOne]
    private ?NiveauScolaire $niveauScolaire = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $etablissement = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $typeEtablissement = null;

    #[ORM\Column(nullable: true)]
    private ?int $anneeAbandon = null;

    #[ORM\ManyToOne]
    private ?Diplome $diplome = null;

    #[ORM\ManyToOne]
    private ?Specialite $specialite = null;

    #[ORM\Column(type: Types::BOOLEAN, nullable: true)]
    private ?bool $hasPreviousTraining = null;

    // --- Previous Training ---
    #[ORM\ManyToOne]
    private ?Diplome $previousDiplome = null;

    #[ORM\ManyToOne]
    private ?Specialite $previousSpecialite = null;

    #[ORM\ManyToOne]
    private ?Centre $previousCentre = null;

    #[ORM\Column(nullable: true)]
    private ?int $previousAnneeFin = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getNumInscription(): ?string
    {
        return $this->numInscription;
    }

    public function setNumInscription(?string $numInscription): static
    {
        $this->numInscription = $numInscription;

        return $this;
    }

    public function getAnneeNaissance(): ?int
    {
        return $this->anneeNaissance;
    }

    public function setAnneeNaissance(?int $anneeNaissance): static
    {
        $this->anneeNaissance = $anneeNaissance;

        return $this;
    }

    public function getLieuNaissance(): ?Municipalite
    {
        return $this->lieuNaissance;
    }

    public function setLieuNaissance(?Municipalite $lieuNaissance): static
    {
        $this->lieuNaissance = $lieuNaissance;

        return $this;
    }

    public function getGouvernoratNaissance(): ?Gouvernorat
    {
        return $this->gouvernoratNaissance;
    }

    public function setGouvernoratNaissance(?Gouvernorat $gouvernoratNaissance): static
    {
        $this->gouvernoratNaissance = $gouvernoratNaissance;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->dateNaissance;
    }

    public function setDateNaissance(?\DateTimeInterface $dateNaissance): static
    {
        $this->dateNaissance = $dateNaissance;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(?string $genre): static
    {
        $this->genre = $genre;

        return $this;
    }

    public function getExtraitNaissancePath(): ?string
    {
        return $this->extraitNaissancePath;
    }

    public function setExtraitNaissancePath(?string $extraitNaissancePath): static
    {
        $this->extraitNaissancePath = $extraitNaissancePath;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->codePostal;
    }

    public function setCodePostal(?string $codePostal): static
    {
        $this->codePostal = $codePostal;

        return $this;
    }

    public function getTelFixe(): ?string
    {
        return $this->telFixe;
    }

    public function setTelFixe(?string $telFixe): static
    {
        $this->telFixe = $telFixe;

        return $this;
    }

    public function getGouvernorat(): ?Gouvernorat
    {
        return $this->gouvernorat;
    }

    public function setGouvernorat(?Gouvernorat $gouvernorat): static
    {
        $this->gouvernorat = $gouvernorat;

        return $this;
    }

    public function getDelegation(): ?Delegation
    {
        return $this->delegation;
    }

    public function setDelegation(?Delegation $delegation): static
    {
        $this->delegation = $delegation;

        return $this;
    }

    public function getNiveauScolaire(): ?NiveauScolaire
    {
        return $this->niveauScolaire;
    }

    public function setNiveauScolaire(?NiveauScolaire $niveauScolaire): static
    {
        $this->niveauScolaire = $niveauScolaire;

        return $this;
    }

    public function getEtablissement(): ?string
    {
        return $this->etablissement;
    }

    public function setEtablissement(?string $etablissement): static
    {
        $this->etablissement = $etablissement;

        return $this;
    }

    public function getTypeEtablissement(): ?string
    {
        return $this->typeEtablissement;
    }

    public function setTypeEtablissement(?string $typeEtablissement): static
    {
        $this->typeEtablissement = $typeEtablissement;

        return $this;
    }

    public function getAnneeAbandon(): ?int
    {
        return $this->anneeAbandon;
    }

    public function setAnneeAbandon(?int $anneeAbandon): static
    {
        $this->anneeAbandon = $anneeAbandon;

        return $this;
    }

    public function getDiplome(): ?Diplome
    {
        return $this->diplome;
    }

    public function setDiplome(?Diplome $diplome): static
    {
        $this->diplome = $diplome;

        return $this;
    }

    public function getSpecialite(): ?Specialite
    {
        return $this->specialite;
    }

    public function setSpecialite(?Specialite $specialite): static
    {
        $this->specialite = $specialite;

        return $this;
    }

    public function isHasPreviousTraining(): ?bool
    {
        return $this->hasPreviousTraining;
    }

    public function setHasPreviousTraining(?bool $hasPreviousTraining): static
    {
        $this->hasPreviousTraining = $hasPreviousTraining;

        return $this;
    }

    public function getPreviousDiplome(): ?Diplome
    {
        return $this->previousDiplome;
    }

    public function setPreviousDiplome(?Diplome $previousDiplome): static
    {
        $this->previousDiplome = $previousDiplome;

        return $this;
    }

    public function getPreviousSpecialite(): ?Specialite
    {
        return $this->previousSpecialite;
    }

    public function setPreviousSpecialite(?Specialite $previousSpecialite): static
    {
        $this->previousSpecialite = $previousSpecialite;

        return $this;
    }

    public function getPreviousCentre(): ?Centre
    {
        return $this->previousCentre;
    }

    public function setPreviousCentre(?Centre $previousCentre): static
    {
        $this->previousCentre = $previousCentre;

        return $this;
    }

    public function getPreviousAnneeFin(): ?int
    {
        return $this->previousAnneeFin;
    }

    public function setPreviousAnneeFin(?int $previousAnneeFin): static
    {
        $this->previousAnneeFin = $previousAnneeFin;

        return $this;
    }
}
