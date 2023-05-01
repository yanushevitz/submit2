<?php

namespace App\Services;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\Post;
class UserService{

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly PostService $postService
    ){
    }

    public function getProfileId($user){
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['auth0'=>$user]);
        if(! $user){
            return null;
        }
        return $user->getId();

    }

    public function createProfile(string $auth0){
        $user = new User();
        $user->setAuth0($auth0);
        $user->setNickname("Judaszenko");
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $user->getId();
    }

    public function fetchProfile($id){
        $profile = $this->entityManager->getRepository(User::class)->findOneBy(['id'=>$id]);
        $posts = $this->postService->fetchFromUser($id);
        return ['profile'=>$profile, 'posts'=>$posts];
    }

    public function fetchUserPosts($id){
        return $this->entityManager->getRepository(Post::class)->findBy(['id'=>$id]);
    }

}