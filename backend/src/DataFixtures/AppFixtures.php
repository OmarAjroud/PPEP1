<?php

namespace App\DataFixtures;

use App\Entity\Candidature;
use App\Entity\Offre;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // Users
        $users = [];
        
        // Admin
        $admin = new User();
        $admin->setEmail('admin@admin.com')
              ->setRoles(['ROLE_ADMIN'])
              ->setPassword($this->hasher->hashPassword($admin, 'password'))
              ->setNom('Admin')
              ->setPrenom('System');
        $manager->persist($admin);
        $users[] = $admin;

        // User
        $user = new User();
        $user->setEmail('user@user.com')
             ->setRoles(['ROLE_USER'])
             ->setPassword($this->hasher->hashPassword($user, 'password'))
             ->setNom('User')
             ->setPrenom('Test');
        $manager->persist($user);
        $users[] = $user;

        // Random Users
        for ($i = 0; $i < 10; $i++) {
            $u = new User();
            $u->setEmail($faker->unique()->email())
              ->setRoles(['ROLE_USER'])
              ->setPassword($this->hasher->hashPassword($u, 'password'))
              ->setNom($faker->lastName())
              ->setPrenom($faker->firstName())
              ->setCin($faker->numerify('########')) // 8 digits
              ->setTelMobile(substr($faker->phoneNumber(), 0, 20))
              ->setAdresse($faker->address())
              ->setCodePostal(substr($faker->postcode(), 0, 10));
            $manager->persist($u);
            $users[] = $u;
        }

        // Offers
        $offres = [];
        for ($i = 0; $i < 10; $i++) {
            $offre = new Offre();
            $offre->setSpecialite($faker->jobTitle())
                  ->setCentre($faker->company())
                  ->setDiplome($faker->randomElement(['CAP', 'BTP', 'BTS']))
                  ->setDebutformation($faker->dateTimeBetween('now', '+6 months'))
                  ->setFinformation($faker->dateTimeBetween('+6 months', '+2 years'))
                  ->setNbplaces($faker->numberBetween(10, 30))
                  ->setFoyer($faker->randomElement(['Oui', 'Non']))
                  ->setHebergement($faker->randomElement(['Oui', 'Non']))
                  ->setBourse($faker->randomElement(['Oui', 'Non']))
                  ->setEtat('Ouvert')
                  ->setEtatnumerique(1)
                  ->setSession($faker->year() . '/' . ($faker->year() + 1))
                  ->setCode($faker->bothify('??####'));
            $manager->persist($offre);
            $offres[] = $offre;
        }

        // Candidatures
        for ($i = 0; $i < 5; $i++) {
            $candidature = new Candidature();
            $userForCand = $faker->randomElement($users);
            $offreForCand = $faker->randomElement($offres);
            
            // Avoid logic errors if user already applied? (Unique constraint might exist, but Entity doesn't show it explicitly in attributes unless in repository or hidden)
            // For now, simpler random assignment.
            
            $candidature->setUser($userForCand)
                        ->setOffre($offreForCand)
                        ->setEtat('En attente')
                        ->setEtatNumerique(0)
                        ->setDateCandidature($faker->dateTimeBetween('-1 month', 'now'));
            $manager->persist($candidature);
        }

        $manager->flush();
    }
}
