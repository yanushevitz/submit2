<?php

namespace App\Services;

use App\Entity\Post;
// use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class PostService{

    public function __construct(
        private readonly SerializerInterface $serializer,
        private readonly EntityManagerInterface $entityManager)
    {

    }
    public function create($request):int{

        $request = $this->serializer->decode($request, "json");
        // var_dump($request);
        $post = new Post();
        $post->setAuthor(0);
        $file = $request['file'];
        $file = explode('\\', $file);
        $file = $file[2];
        // var_dump($file);
        $post->setImage($file);
        $post->setText($request['text']);
        $post->setReactions(0);
        // var_dump()
        $this->entityManager->persist($post);
        $this->entityManager->flush();
        return $post->getId();
    }
}