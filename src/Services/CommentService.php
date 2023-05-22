<?php

namespace App\Services;

use App\Entity\Comment;
use App\Entity\Post;
// use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class CommentService{

    public function __construct(
        private readonly SerializerInterface $serializer,
        private readonly EntityManagerInterface $entityManager)
    {

    }
    public function create(Request $request, string $user, $id){
        $comment = new Comment();
        $comment->setOwner($user);
        $comment->setPost($this->entityManager->find(Post::class, $id));
        $comment->setText($this->serializer->decode($request->getContent(), 'json')['text']);
        $this->entityManager->persist($comment);
        $this->entityManager->flush();
        return $comment->getId();
        
    }

}