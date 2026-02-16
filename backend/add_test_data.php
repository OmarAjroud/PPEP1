<?php

require __DIR__ . '/vendor/autoload.php';

use App\Entity\Offre;
use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;
use Doctrine\DBAL\DriverManager;
use Symfony\Component\PasswordHasher\Hasher\NativePasswordHasher;

// Load environment
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Create EntityManager
$config = ORMSetup::createAttributeMetadataConfiguration(
    paths: [__DIR__ . '/src/Entity'],
    isDevMode: true,
);

$connection = DriverManager::getConnection([
    'url' => $_ENV['DATABASE_URL']
], $config);

$entityManager = new EntityManager($connection, $config);

// Create test user
$hasher = new NativePasswordHasher();
$user = new User();
$user->setEmail('test@example.com');
$user->setPassword($hasher->hash('password123'));
$user->setNom('Test');
$user->setPrenom('User');
$user->setCin('12345678');

$entityManager->persist($user);

// Create test offers
$offres = [
    [
        'specialite' => 'Développement Web',
        'centre' => 'Centre ATFP Tunis',
        'diplome' => 'Licence Professionnelle',
        'debutformation' => '2026-09-01',
        'nbplaces' => 25,
        'foyer' => 'Oui',
        'hebergement' => 'Disponible',
        'bourse' => 'Oui',
        'etat' => 'Ouvert',
        'etatnumerique' => 1,
        'session' => '2026-2027',
        'code' => 'DEV-WEB-001'
    ],
    [
        'specialite' => 'Réseaux et Sécurité',
        'centre' => 'Centre ATFP Sousse',
        'diplome' => 'Technicien Supérieur',
        'debutformation' => '2026-09-15',
        'nbplaces' => 20,
        'foyer' => 'Non',
        'hebergement' => 'Non disponible',
        'bourse' => 'Non',
        'etat' => 'Ouvert',
        'etatnumerique' => 1,
        'session' => '2026-2027',
        'code' => 'RES-SEC-002'
    ],
    [
        'specialite' => 'Administration Systèmes',
        'centre' => 'Centre ATFP Sfax',
        'diplome' => 'Licence Professionnelle',
        'debutformation' => '2026-10-01',
        'nbplaces' => 15,
        'foyer' => 'Oui',
        'hebergement' => 'Disponible',
        'bourse' => 'Oui',
        'etat' => 'Ouvert',
        'etatnumerique' => 1,
        'session' => '2026-2027',
        'code' => 'ADM-SYS-003'
    ],
];

foreach ($offres as $offreData) {
    $offre = new Offre();
    $offre->setSpecialite($offreData['specialite']);
    $offre->setCentre($offreData['centre']);
    $offre->setDiplome($offreData['diplome']);
    $offre->setDebutformation(new \DateTime($offreData['debutformation']));
    $offre->setNbplaces($offreData['nbplaces']);
    $offre->setFoyer($offreData['foyer']);
    $offre->setHebergement($offreData['hebergement']);
    $offre->setBourse($offreData['bourse']);
    $offre->setEtat($offreData['etat']);
    $offre->setEtatnumerique($offreData['etatnumerique']);
    $offre->setSession($offreData['session']);
    $offre->setCode($offreData['code']);
    
    $entityManager->persist($offre);
}

$entityManager->flush();

echo "Test data created successfully!\n";
echo "Test user: test@example.com / password123\n";
echo "Created " . count($offres) . " test offers\n";
