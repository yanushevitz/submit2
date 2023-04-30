<?php

namespace App\Services;

use App\Entity\Post;
// use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class PostService{

    public function __construct(
        private readonly SerializerInterface $serializer,
        private readonly EntityManagerInterface $entityManager)
    {

    }
    public function create(Request $request, int $user):int{

        $file = $request->files->get("file");
        $slicedFilename = explode(".", $file->getClientOriginalName());
        $slicedFilename[2] = $slicedFilename[1];
        $slicedFilename[1] = Uuid::uuid4();
        $filename = $slicedFilename[0].$slicedFilename[1].".".$slicedFilename[2];
        $filePath = "/var/www/public/uploads/";

        $file->move($filePath, $filename);
        
        $postText = $request->request->get('text');
        $post = new Post();
        $post->setAuthor($user);
        $post->setImage($filename);
        $post->setText($postText);
        $post->setReactions(0);
        $this->entityManager->persist($post);
        $this->entityManager->flush();
        return $post->getId();
    }
    public function fetchById($id){
        return $this->entityManager->find(Post::class, $id);
    }

    public function fetchFrom($id){
        // todo: make fetching new posts working
        $posts = $this->entityManager->createQuery("SELECT p FROM App\Entity\Post p WHERE p.id > ".$id)->getArrayResult();
        $posts['comments'] = [];
        $comments = $this->entityManager->createQuery("SELECT c FROM App\Entity\Comment c WHERE c.post > ".$id)->getArrayResult();
        // foreach($comments as $comments){

        // }
        echo '<pre>';
        print_r($posts);
        print_r($comments);
    }

}