<?php

namespace App\Entity;

use App\Repository\CentreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CentreRepository::class)]
class Centre
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    private ?Gouvernorat $gouvernorat = null;
    
    // Note: Some implicit relation to Specialite might exist if Centres offer Specialities
    // But for dropdown 'getAllCentresBySpecialite', we might need a ManyToMany or OneToMany.
    // Assuming backend logic: Specialite -> Centres? Or Centre -> Specialites?
    // api.service.ts says: getAllCentresBySpecialite(id).
    // So Centre must be searchable by Specialite.
    // I will add ManyToMany to Specialite for now to support this.
    
    #[ORM\ManyToMany(targetEntity: Specialite::class)]
    private Collection $specialites;

    public function __construct() {
        $this->specialites = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

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

    public function getSpecialites(): Collection
    {
        return $this->specialites;
    }

    public function addSpecialite(Specialite $specialite): static
    {
        if (!$this->specialites->contains($specialite)) {
            $this->specialites->add($specialite);
        }

        return $this;
    }
}
