<?php

namespace App\DataFixtures;

use App\Entity\Centre;
use App\Entity\Delegation;
use App\Entity\Diplome;
use App\Entity\Gouvernorat;
use App\Entity\Municipalite;
use App\Entity\NiveauScolaire;
use App\Entity\Specialite;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher) {}

    public function load(ObjectManager $manager): void
    {
        // 1. Create Govs
        $govs = [];
        foreach (['Tunis', 'Ariana', 'Ben Arous', 'Sousse', 'Sfax'] as $name) {
            $existing = $manager->getRepository(Gouvernorat::class)->findOneBy(['libelle' => $name]);
            if (!$existing) {
                $gov = new Gouvernorat();
                $gov->setLibelle($name);
                $manager->persist($gov);
                $govs[$name] = $gov;
            } else {
                $govs[$name] = $existing;
            }
        }
        
        // 2. Create Diplomes
        $diplomes = [];
        foreach (['CAP', 'BTP', 'BTS'] as $name) {
             $d = new Diplome();
             $d->setLibelle($name);
             $manager->persist($d);
             $diplomes[] = $d;
        }
        
        // 3. Create Specialites
        $specs = [];
        $specNames = ['Informatique', 'Mecanique', 'Electricite', 'Gestion', 'Cuisine', 'Soudure', 'Design', 'Reseaux', 'Froid', 'Comptabilite'];
        foreach ($specNames as $i => $name) {
             $s = new Specialite();
             $s->setLibelle($name);
             // Link to random diplome
             $s->setDiplome($diplomes[$i % 3]);
             $manager->persist($s);
             $specs[] = $s;
        }
        
        // 4. Create Centres & Link to Govs & Specs
        $centres = [];
        foreach ($govs as $govName => $gov) {
            for ($i = 1; $i <= 3; $i++) {
                $c = new Centre();
                $c->setNom("CSF $govName $i");
                $c->setGouvernorat($gov);
                
                // Assign 5 random specialites
                shuffle($specs);
                for ($j = 0; $j < 5; $j++) {
                    $c->addSpecialite($specs[$j]);
                }
                
                $manager->persist($c);
                $centres[] = $c;
            }
        }
        
        // 5. Create Admin User
        $admin = new User();
        $admin->setEmail('admin@admin.com');
        $admin->setPassword($this->hasher->hashPassword($admin, 'password'));
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setNom('Admin');
        $admin->setPrenom('User');
        $manager->persist($admin);

        $manager->flush(); // Flush to generate IDs
        
        // 6. Create Offers
        $offerCount = 0;
        foreach ($centres as $centre) {
            foreach ($centre->getSpecialites() as $spec) {
                // Create 2 offers per spec/centre pair
                for ($k = 1; $k <= 2; $k++) {
                     $offre = new \App\Entity\Offre();
                     $offerCount++;
                     $offre->setCode('OFF-' . $offerCount);
                     $offre->setCentre($centre);
                     $offre->setSpecialite($spec);
                     $offre->setDiplome($spec->getDiplome());
                     
                     $offre->setDebutformation(new \DateTime('+' . rand(1, 6) . ' month'));
                     $offre->setFinformation(new \DateTime('+2 year'));
                     $offre->setNbplaces(rand(15, 30));
                     $offre->setEtat('Ouverte');
                     $offre->setSession('Session Septembre 2026');
                     $offre->setBourse(rand(0, 1) ? 'Oui' : 'Non');
                     $offre->setFoyer(rand(0, 1) ? 'Oui' : 'Non');
                     $offre->setHebergement(rand(0, 1) ? 'Oui' : 'Non');
                     
                     $manager->persist($offre);
                }
            }
        }

        $manager->flush();
    }
}
