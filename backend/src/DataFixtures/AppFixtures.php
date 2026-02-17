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
        // 1. Data Source (JSON)
        $jsonPath = __DIR__ . '/../../var/data/tunisia.json';
        if (!file_exists($jsonPath)) {
            echo "Warning: tunisia.json not found. Falling back to simple seed.\n";
            // Fallback content...
            return;
        }

        $data = json_decode(file_get_contents($jsonPath), true);
        $govEntities = [];

        // 2. Load Location Data
        foreach ($data as $govData) {
            $govName = $govData['governorate'];
            $g = new Gouvernorat();
            $g->setLibelle($govName);
            $manager->persist($g);
            $govEntities[$govName] = $g;

            if (isset($govData['delegations'])) {
                foreach ($govData['delegations'] as $delData) {
                    $delName = $delData['name'];
                    $d = new Delegation();
                    $d->setLibelle($delName);
                    $d->setGouvernorat($g);
                    $manager->persist($d);

                    if (isset($delData['municipalities'])) {
                        foreach ($delData['municipalities'] as $munName) {
                            $m = new Municipalite();
                            $m->setLibelle($munName);
                            $m->setGouvernorat($g);
                            $m->setDelegation($d);
                            $manager->persist($m);
                        }
                    }
                }
            }
        }

        // 3. Niveaux Scolaire
        $niveaux = ['9eme annee', '1ere annee secondaire', '2eme annee secondaire', '3eme annee secondaire', 'Baccalaureat', 'Niveau Universitaire'];
        foreach ($niveaux as $nom) {
            $n = new NiveauScolaire();
            $n->setLibelle($nom);
            $manager->persist($n);
        }

        // 4. Diplomes
        $diplomes = ['CAP', 'BTP', 'BTS'];
        $diplomeEntities = [];
        foreach ($diplomes as $nom) {
            $d = new Diplome();
            $d->setLibelle($nom);
            $manager->persist($d);
            $diplomeEntities[$nom] = $d;
        }

        // 5. Specialites
        $specs = [
            'Informatique' => 'BTS',
            'Comptabilite' => 'BTS',
            'Mecanique' => 'BTP',
            'Electricite' => 'BTP',
            'Soudure' => 'CAP',
            'Couture' => 'CAP',
            'Cuisine' => 'CAP',
            'Patisserie' => 'BTP',
            'Reseaux' => 'BTS',
            'Developpement' => 'BTS'
        ];
        $specEntities = [];
        foreach ($specs as $nom => $dipName) {
            $s = new Specialite();
            $s->setLibelle($nom);
            $s->setDiplome($diplomeEntities[$dipName]);
            $manager->persist($s);
            $specEntities[] = $s;
        }

        // 6. Centres
        if (isset($govEntities['Ariana'])) {
            $centre = new Centre();
            $centre->setNom('CSF Ariana');
            $centre->setGouvernorat($govEntities['Ariana']);
            $centre->addSpecialite($specEntities[0]); // Info
            $centre->addSpecialite($specEntities[8]); // Reseaux
            $manager->persist($centre);
        }
        
        if (isset($govEntities['Tunis'])) {
            $centre = new Centre();
            $centre->setNom('CSF Tunis');
            $centre->setGouvernorat($govEntities['Tunis']);
            $centre->addSpecialite($specEntities[9]); // Dev
            $manager->persist($centre);
        }

        // 7. Users
        $admin = new User();
        $admin->setEmail('admin@admin.com');
        $admin->setPassword($this->hasher->hashPassword($admin, 'password'));
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setNom('Admin');
        $admin->setPrenom('User');
        $manager->persist($admin);

        $manager->flush();
    }
}
