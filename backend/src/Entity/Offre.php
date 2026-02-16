<?php

namespace App\Entity;

use App\Repository\OffreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OffreRepository::class)]
class Offre
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $specialite = null;

    #[ORM\Column(length: 255)]
    private ?string $centre = null;

    #[ORM\Column(length: 255)]
    private ?string $diplome = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $debutformation = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $finformation = null;

    #[ORM\Column(nullable: true)]
    private ?int $nbplaces = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $foyer = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $hebergement = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $bourse = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $etat = null;

    #[ORM\Column(nullable: true)]
    private ?int $etatnumerique = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $session = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $code = null;

    /**
     * @var Collection<int, Candidature>
     */
    #[ORM\OneToMany(targetEntity: Candidature::class, mappedBy: 'offre', orphanRemoval: true)]
    private Collection $candidatures;

    public function __construct()
    {
        $this->candidatures = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSpecialite(): ?string
    {
        return $this->specialite;
    }

    public function setSpecialite(string $specialite): static
    {
        $this->specialite = $specialite;

        return $this;
    }

    public function getCentre(): ?string
    {
        return $this->centre;
    }

    public function setCentre(string $centre): static
    {
        $this->centre = $centre;

        return $this;
    }

    public function getDiplome(): ?string
    {
        return $this->diplome;
    }

    public function setDiplome(string $diplome): static
    {
        $this->diplome = $diplome;

        return $this;
    }

    public function getDebutformation(): ?\DateTimeInterface
    {
        return $this->debutformation;
    }

    public function setDebutformation(\DateTimeInterface $debutformation): static
    {
        $this->debutformation = $debutformation;

        return $this;
    }

    public function getFinformation(): ?\DateTimeInterface
    {
        return $this->finformation;
    }

    public function setFinformation(?\DateTimeInterface $finformation): static
    {
        $this->finformation = $finformation;

        return $this;
    }

    public function getNbplaces(): ?int
    {
        return $this->nbplaces;
    }

    public function setNbplaces(?int $nbplaces): static
    {
        $this->nbplaces = $nbplaces;

        return $this;
    }

    public function getFoyer(): ?string
    {
        return $this->foyer;
    }

    public function setFoyer(?string $foyer): static
    {
        $this->foyer = $foyer;

        return $this;
    }

    public function getHebergement(): ?string
    {
        return $this->hebergement;
    }

    public function setHebergement(?string $hebergement): static
    {
        $this->hebergement = $hebergement;

        return $this;
    }

    public function getBourse(): ?string
    {
        return $this->bourse;
    }

    public function setBourse(?string $bourse): static
    {
        $this->bourse = $bourse;

        return $this;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(?string $etat): static
    {
        $this->etat = $etat;

        return $this;
    }

    public function getEtatnumerique(): ?int
    {
        return $this->etatnumerique;
    }

    public function setEtatnumerique(?int $etatnumerique): static
    {
        $this->etatnumerique = $etatnumerique;

        return $this;
    }

    public function getSession(): ?string
    {
        return $this->session;
    }

    public function setSession(?string $session): static
    {
        $this->session = $session;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(?string $code): static
    {
        $this->code = $code;

        return $this;
    }

    /**
     * @return Collection<int, Candidature>
     */
    public function getCandidatures(): Collection
    {
        return $this->candidatures;
    }

    public function addCandidature(Candidature $candidature): static
    {
        if (!$this->candidatures->contains($candidature)) {
            $this->candidatures->add($candidature);
            $candidature->setOffre($this);
        }

        return $this;
    }

    public function removeCandidature(Candidature $candidature): static
    {
        if ($this->candidatures->removeElement($candidature)) {
            if ($candidature->getOffre() === $this) {
                $candidature->setOffre(null);
            }
        }

        return $this;
    }
}
