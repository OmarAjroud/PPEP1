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
        // =====================================================================
        // 1. NIVEAU SCOLAIRE
        // =====================================================================
        $niveauxNames = [
            'Sans niveau',
            'Primaire',
            '6ème année primaire',
            '1ère année secondaire',
            '2ème année secondaire',
            '3ème année secondaire',
            '4ème année secondaire',
            'Baccalauréat',
            'Bac + 1',
            'Bac + 2',
            'Bac + 3 (Licence)',
            'Bac + 4',
            'Bac + 5 (Master / Ingénieur)',
            'Doctorat',
        ];

        foreach ($niveauxNames as $name) {
            $existing = $manager->getRepository(NiveauScolaire::class)->findOneBy(['libelle' => $name]);
            if (!$existing) {
                $n = new NiveauScolaire();
                $n->setLibelle($name);
                $manager->persist($n);
            }
        }

        // =====================================================================
        // 2. GOUVERNORATS + DELEGATIONS + MUNICIPALITES (all 24 Tunisian governorates)
        // =====================================================================

        // Data structure: 'GouvName' => ['DelegationName' => ['Municipalite1', 'Municipalite2', ...], ...]
        $data = [
            'Tunis' => [
                'Tunis' => ['Tunis', 'Bab Bhar', 'Bab Souika', 'El Omrane', 'El Omrane supérieur', 'El Menzah', 'Cité El Khadra', 'Jebel Jloud', 'Le Bardo'],
                'Carthage' => ['Carthage', 'Sidi Bou Saïd', 'La Goulette', 'Le Kram'],
                'La Marsa' => ['La Marsa', 'Gammarth', 'Raoued'],
                'Le Bardo' => ['Le Bardo', 'Manouba'],
                'La Soukra' => ['La Soukra', 'Ariana Ville'],
            ],
            'Ariana' => [
                'Ariana' => ['Ariana Ville', 'Ghazela', 'Mnihla'],
                'La Soukra' => ['La Soukra', 'Raoued', 'Kalâat El Andalous'],
                'Raoued' => ['Raoued', 'Borj Louzir'],
                'Mnihla' => ['Mnihla', 'Ettadhamen'],
                'Ettadhamen' => ['Ettadhamen', 'Intilaka'],
                'Sidi Thabet' => ['Sidi Thabet'],
            ],
            'Ben Arous' => [
                'Ben Arous' => ['Ben Arous', 'Mourouj', 'Nouvelle Médina'],
                'Mourouj' => ['Mourouj', 'Hammam Lif'],
                'Hammam Lif' => ['Hammam Lif', 'Boumhel El Bassatine'],
                'Bou Mhel El Bassatine' => ['Bou Mhel El Bassatine', 'Mégrine'],
                'Mégrine' => ['Mégrine', 'Ezzahra'],
                'Ezzahra' => ['Ezzahra', 'Radès'],
                'Radès' => ['Radès'],
                'Fouchana' => ['Fouchana', 'Mhamdia'],
                'Hammam Chatt' => ['Hammam Chatt'],
                'Bou Argoub' => ['Bou Argoub', 'Soliman'],
                'El Mourouj' => ['El Mourouj'],
            ],
            'Manouba' => [
                'Manouba' => ['Manouba', 'Douar Hicher', 'Oued Ellil'],
                'Tebourba' => ['Tebourba', 'El Battan'],
                'La Manouba' => ['La Manouba'],
                'Djedeida' => ['Djedeida'],
                'Mornaguia' => ['Mornaguia'],
                'Borj El Amri' => ['Borj El Amri'],
                'Jedaida' => ['Jedaida'],
                'El Battan' => ['El Battan'],
            ],
            'Nabeul' => [
                'Nabeul' => ['Nabeul', 'Bni Khalled', 'Dar Chaabane El Fehri'],
                'Hammamet' => ['Hammamet', 'Nabeul'],
                'Grombalia' => ['Grombalia'],
                'Kelibia' => ['Kelibia', 'Menzel Temime'],
                'Soliman' => ['Soliman', 'Bou Argoub'],
                'Menzel Bouzelfa' => ['Menzel Bouzelfa'],
                'Takelsa' => ['Takelsa'],
                'El Haouaria' => ['El Haouaria'],
                'Korba' => ['Korba', 'Diar El Hajjaj'],
            ],
            'Zaghouan' => [
                'Zaghouan' => ['Zaghouan'],
                'El Fahs' => ['El Fahs'],
                'Bir Mcherga' => ['Bir Mcherga'],
                'Nadhour' => ['Nadhour'],
                'Saouaf' => ['Saouaf'],
                'Zriba' => ['Zriba'],
            ],
            'Bizerte' => [
                'Bizerte' => ['Bizerte', 'Bizerte Nord', 'Bizerte Sud'],
                'Menzel Bourguiba' => ['Menzel Bourguiba', 'Tinja'],
                'Mateur' => ['Mateur'],
                'Sejnane' => ['Sejnane'],
                'Joumine' => ['Joumine'],
                'Ghezala' => ['Ghezala'],
                'Utique' => ['Utique'],
                'El Alia' => ['El Alia'],
                'Ras Jebel' => ['Ras Jebel', 'Ghar El Melh'],
                'Tinja' => ['Tinja'],
            ],
            'Béja' => [
                'Béja' => ['Béja', 'Béja Nord', 'Béja Sud'],
                'Nefza' => ['Nefza'],
                'Téboursouk' => ['Téboursouk'],
                'Testour' => ['Testour'],
                'Mejez El Bab' => ['Mejez El Bab'],
                'Goubellat' => ['Goubellat'],
                'Thibar' => ['Thibar'],
                'Amdoun' => ['Amdoun'],
            ],
            'Jendouba' => [
                'Jendouba' => ['Jendouba', 'Jendouba Nord'],
                'Bou Salem' => ['Bou Salem'],
                'Tabarka' => ['Tabarka'],
                'Ain Draham' => ['Ain Draham'],
                'Fernana' => ['Fernana'],
                'Ghardimaou' => ['Ghardimaou'],
                'Balta Bou Aouene' => ['Balta Bou Aouene'],
                'Oued Melliz' => ['Oued Melliz'],
            ],
            'Kef' => [
                'Le Kef' => ['Le Kef', 'Le Kef Ouest', 'Le Kef Est'],
                'Tajerouine' => ['Tajerouine'],
                'Kalaat Senan' => ['Kalaat Senan'],
                'El Ksour' => ['El Ksour'],
                'Sakiet Sidi Youssef' => ['Sakiet Sidi Youssef'],
                'Nebeur' => ['Nebeur'],
                'Touiref' => ['Touiref'],
                'Dahmani' => ['Dahmani'],
            ],
            'Siliana' => [
                'Siliana' => ['Siliana', 'Siliana Nord', 'Siliana Sud'],
                'Makthar' => ['Makthar'],
                'Rouhia' => ['Rouhia'],
                'Kesra' => ['Kesra'],
                'Bargou' => ['Bargou'],
                'El Aroussa' => ['El Aroussa'],
                'Bou Arada' => ['Bou Arada'],
                'Gaâfour' => ['Gaâfour'],
                'Ain El Assel' => ['Ain El Assel'],
            ],
            'Sousse' => [
                'Sousse' => ['Sousse', 'Sousse Ville', 'Sousse Sidi Abdelhamid', 'Sousse Riadh', 'Sousse Jaouhara'],
                'Hammam Sousse' => ['Hammam Sousse'],
                'Akouda' => ['Akouda', 'Kantaoui'],
                'Kalaa Kebira' => ['Kalaa Kebira'],
                'Sidi Bou Ali' => ['Sidi Bou Ali'],
                'Enfidha' => ['Enfidha'],
                'Hergla' => ['Hergla'],
                'Kondar' => ['Kondar'],
                'Msaken' => ['Msaken'],
                'M\'Saken' => ['M\'Saken', 'Aoun'],
            ],
            'Monastir' => [
                'Monastir' => ['Monastir'],
                'Ksar Hellal' => ['Ksar Hellal'],
                'Sahline' => ['Sahline'],
                'Zeramdine' => ['Zeramdine'],
                'Beni Hassen' => ['Beni Hassen'],
                'Jammel' => ['Jammel'],
                'Ouerdanine' => ['Ouerdanine'],
                'Teboulba' => ['Teboulba'],
                'Bekalta' => ['Bekalta'],
                'Bembla' => ['Bembla'],
            ],
            'Mahdia' => [
                'Mahdia' => ['Mahdia'],
                'Ksour Essef' => ['Ksour Essef'],
                'El Jem' => ['El Jem'],
                'Chebba' => ['Chebba'],
                'Salakta' => ['Salakta'],
                'Essouassi' => ['Essouassi'],
                'El Bradaa' => ['El Bradaa'],
                'Hebira' => ['Hebira'],
                'Ouled Chamekh' => ['Ouled Chamekh'],
                'Bou Merdes' => ['Bou Merdes'],
            ],
            'Sfax' => [
                'Sfax Ville' => ['Sfax Ville', 'Sfax Est', 'Sfax Ouest', 'Sfax Sud'],
                'Sakiet Eddaïer' => ['Sakiet Eddaïer'],
                'Sakiet Ezzit' => ['Sakiet Ezzit'],
                'Chihia' => ['Chihia'],
                'Agareb' => ['Agareb'],
                'Djebéniana' => ['Djebéniana'],
                'El Amra' => ['El Amra'],
                'El Hencha' => ['El Hencha'],
                'Skhira' => ['Skhira'],
                'Graïba' => ['Graïba'],
                'Bir Ali Ben Khélifa' => ['Bir Ali Ben Khélifa'],
                'Kerkennah' => ['Kerkennah', 'Remla'],
                'Menzel Chaker' => ['Menzel Chaker'],
                'Mahres' => ['Mahres'],
            ],
            'Kairouan' => [
                'Kairouan' => ['Kairouan Nord', 'Kairouan Sud'],
                'Oueslatia' => ['Oueslatia'],
                'Sbikha' => ['Sbikha'],
                'El Ousseltia' => ['El Ousseltia'],
                'El Alaa' => ['El Alaa'],
                'Hajeb El Ayoun' => ['Hajeb El Ayoun'],
                'Nasrallah' => ['Nasrallah'],
                'Chebika' => ['Chebika'],
                'Mergueb' => ['Mergueb'],
                'Bou Hajla' => ['Bou Hajla'],
                'Menzel Mehiri' => ['Menzel Mehiri'],
                'Ain Jloula' => ['Ain Jloula'],
            ],
            'Kasserine' => [
                'Kasserine' => ['Kasserine Nord', 'Kasserine Sud'],
                'Sbeitla' => ['Sbeitla'],
                'Sbiba' => ['Sbiba'],
                'Feriana' => ['Feriana'],
                'Foussana' => ['Foussana'],
                'El Ayoun' => ['El Ayoun'],
                'Thelept' => ['Thelept'],
                'Majel Bel Abbes' => ['Majel Bel Abbes'],
                'Hassi El Ferid' => ['Hassi El Ferid'],
                'Ezzouhour' => ['Ezzouhour'],
                'Hidra' => ['Hidra'],
                'Jedeliane' => ['Jedeliane'],
            ],
            'Sidi Bouzid' => [
                'Sidi Bouzid' => ['Sidi Bouzid Est', 'Sidi Bouzid Ouest'],
                'Jilma' => ['Jilma'],
                'Bir El Hafey' => ['Bir El Hafey'],
                'Sidi Ali Ben Aoun' => ['Sidi Ali Ben Aoun'],
                'Menzel Bouzaiane' => ['Menzel Bouzaiane'],
                'Les Ouled Haffouz' => ['Les Ouled Haffouz'],
                'Souk Jedid' => ['Souk Jedid'],
                'El Maknassy' => ['El Maknassy'],
                'Mezzouna' => ['Mezzouna'],
                'Regueb' => ['Regueb'],
                'Ouled Asker' => ['Ouled Asker'],
                'Chouket El Argoub' => ['Chouket El Argoub'],
            ],
            'Gabès' => [
                'Gabès' => ['Gabès Ville', 'Gabès Ouest', 'Gabès Sud'],
                'El Hamma' => ['El Hamma'],
                'Mareth' => ['Mareth'],
                'Nouvelle Matmata' => ['Nouvelle Matmata'],
                'Matmata' => ['Matmata'],
                'Métouia' => ['Métouia'],
                'Ghannouch' => ['Ghannouch'],
                'Oudhref' => ['Oudhref'],
                'El Fje' => ['El Fje'],
                'Menzel El Habib' => ['Menzel El Habib'],
            ],
            'Médenine' => [
                'Médenine' => ['Médenine Nord', 'Médenine Sud'],
                'Ben Gardane' => ['Ben Gardane'],
                'Zarzis' => ['Zarzis'],
                'Houmt Souk' => ['Houmt Souk', 'Jerba'],
                'Midoun' => ['Midoun'],
                'Ajim' => ['Ajim'],
                'Sidi Makhlouf' => ['Sidi Makhlouf'],
                'Ben Mhamed' => ['Ben Mhamed'],
                'Beni Khedache' => ['Beni Khedache'],
            ],
            'Tataouine' => [
                'Tataouine' => ['Tataouine Nord', 'Tataouine Sud'],
                'Ghomrassen' => ['Ghomrassen'],
                'Bir Lahmar' => ['Bir Lahmar'],
                'Smar' => ['Smar'],
                'Dehiba' => ['Dehiba'],
                'Remada' => ['Remada'],
            ],
            'Gafsa' => [
                'Gafsa' => ['Gafsa Nord', 'Gafsa Sud'],
                'El Ksar' => ['El Ksar'],
                'Moularès' => ['Moularès'],
                'Redeyef' => ['Redeyef'],
                'Métlaoui' => ['Métlaoui'],
                'Sidi Aïch' => ['Sidi Aïch'],
                'El Guettar' => ['El Guettar'],
                'Belkhir' => ['Belkhir'],
                'Sidi El Bader' => ['Sidi El Bader'],
                'Oum El Araies' => ['Oum El Araies'],
            ],
            'Tozeur' => [
                'Tozeur' => ['Tozeur'],
                'Degache' => ['Degache'],
                'Hazoua' => ['Hazoua'],
                'Nefta' => ['Nefta'],
                'Tameghza' => ['Tameghza'],
            ],
            'Kébili' => [
                'Kébili' => ['Kébili Nord', 'Kébili Sud'],
                'Douz' => ['Douz Nord', 'Douz Sud'],
                'Souk Lahad' => ['Souk Lahad'],
                'El Faouar' => ['El Faouar'],
            ],
        ];

        $govEntities = [];

        foreach ($data as $govName => $delegationsData) {
            // Create or find Gouvernorat
            $gov = $manager->getRepository(Gouvernorat::class)->findOneBy(['libelle' => $govName]);
            if (!$gov) {
                $gov = new Gouvernorat();
                $gov->setLibelle($govName);
                $manager->persist($gov);
            }
            $govEntities[$govName] = $gov;
        }

        // Flush gouvernorats first to get their IDs
        $manager->flush();

        foreach ($data as $govName => $delegationsData) {
            $gov = $govEntities[$govName];

            foreach ($delegationsData as $delegName => $municipalites) {
                // Create or find Delegation
                $deleg = $manager->getRepository(Delegation::class)->findOneBy(['libelle' => $delegName, 'gouvernorat' => $gov]);
                if (!$deleg) {
                    $deleg = new Delegation();
                    $deleg->setLibelle($delegName);
                    $deleg->setGouvernorat($gov);
                    $manager->persist($deleg);
                }

                // Flush delegation to get ID before creating municipalites
                $manager->flush();

                foreach ($municipalites as $muniName) {
                    $muni = $manager->getRepository(Municipalite::class)->findOneBy(['libelle' => $muniName, 'gouvernorat' => $gov]);
                    if (!$muni) {
                        $muni = new Municipalite();
                        $muni->setLibelle($muniName);
                        $muni->setGouvernorat($gov);
                        $muni->setDelegation($deleg);
                        $manager->persist($muni);
                    }
                }
            }
        }

        // =====================================================================
        // 3. DIPLOMES
        // =====================================================================
        $diplomes = [];
        foreach (['CAP', 'BTP', 'BTS'] as $name) {
            $d = $manager->getRepository(Diplome::class)->findOneBy(['libelle' => $name]);
            if (!$d) {
                $d = new Diplome();
                $d->setLibelle($name);
                $manager->persist($d);
            }
            $diplomes[] = $d;
        }

        // =====================================================================
        // 4. SPECIALITES
        // =====================================================================
        $specs = [];
        $specNames = ['Informatique', 'Mecanique', 'Electricite', 'Gestion', 'Cuisine', 'Soudure', 'Design', 'Reseaux', 'Froid', 'Comptabilite'];
        foreach ($specNames as $i => $name) {
            $s = $manager->getRepository(Specialite::class)->findOneBy(['libelle' => $name]);
            if (!$s) {
                $s = new Specialite();
                $s->setLibelle($name);
            }
            // Ensure diplome is assigned even if entity already existed
            if (isset($diplomes[$i % 3])) {
                $s->setDiplome($diplomes[$i % 3]);
            }
            $manager->persist($s);
            $specs[] = $s;
        }

        $manager->flush();

        // =====================================================================
        // 5. CENTRES (linked to first few gouvernorats)
        // =====================================================================
        $centres = [];
        $govSample = array_slice($govEntities, 0, 5, true);
        foreach ($govSample as $govName => $gov) {
            for ($i = 1; $i <= 3; $i++) {
                $nomCentre = "CSF $govName $i";
                $c = $manager->getRepository(Centre::class)->findOneBy(['nom' => $nomCentre]);
                if (!$c) {
                    $c = new Centre();
                    $c->setNom($nomCentre);
                    $c->setGouvernorat($gov);

                    shuffle($specs);
                    for ($j = 0; $j < 5 && isset($specs[$j]); $j++) {
                        $c->addSpecialite($specs[$j]);
                    }
                    $manager->persist($c);
                }
                $centres[] = $c;
            }
        }

        // =====================================================================
        // 6. ADMIN USER
        // =====================================================================
        $existingAdmin = $manager->getRepository(User::class)->findOneBy(['email' => 'admin@admin.com']);
        if (!$existingAdmin) {
            $admin = new User();
            $admin->setEmail('admin@admin.com');
            $admin->setPassword($this->hasher->hashPassword($admin, 'password'));
            $admin->setRoles(['ROLE_ADMIN']);
            $admin->setNom('Admin');
            $admin->setPrenom('User');
            $manager->persist($admin);
        }

        $manager->flush();

        // =====================================================================
        // 7. OFFRES (linked to centres)
        // =====================================================================
        $offerCount = 0;
        foreach ($centres as $centre) {
            foreach ($centre->getSpecialites() as $spec) {
                for ($k = 1; $k <= 2; $k++) {
                    $offerCount++;
                    $offre = new \App\Entity\Offre();
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
