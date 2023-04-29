<?php

namespace App\Services;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
class UserService{

    public function __construct(
        private readonly EntityManagerInterface $entityManager
    ){
    }

    public function getProfileId($auth0){
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['auth0' => $auth0->user['sub']]);
        if(! $user){
            return null;
        }
        return $user->getId();

    }

    public function createProfile($auth0){
        $user = new User();
        $user->setAuth0($auth0->user['sub']);
        $user->setNickname("Judaszenko");
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $user->getId();
    }

}