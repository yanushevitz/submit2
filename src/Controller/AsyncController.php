<?php

namespace App\Controller;

use App\Entity\Post;
use App\Services\PostService;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Http\Message\RequestInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
// use Symfony\Component\Serializer\SerializerInte;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class AsyncController extends AbstractController
{
    private readonly SerializerInterface $serializer;
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly PostService $postService
        
    ){

        $defaultContext = [ 
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object){
                return $object->getAuthor();            
            }
            ];
        $this->serializer = new Serializer([new ObjectNormalizer(defaultContext: $defaultContext)], [new JsonEncoder]);
    }

    #[Route('/async/posts', name: 'async_posts')]
    public function index(): Response
    {
        $posts = $this->entityManager->getRepository(Post::class)->findAll();
        $defaultContext = [ 
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object){
                return $object->getName();            
            }
            ];
        $json = $this->serializer->serialize($posts, 'json', ['groups' => ['user', 'comment']]);
        $response = new JsonResponse();
        $response->setContent($json);
        $response->headers->set('Access-Control-Allow-Origin', "*");
        return $response;
    }
    #[Route("/async/post", name: "async_post")]
    public function createPost(Request $request){
        // var_dump($request->getContent());
        $status = $this->postService->create($request->getContent());
        if($status){
            return new JsonResponse(['status' => 'created']);
            
        }
        else{
            return new JsonResponse(['status' => 'error']);

        }
        // var_dump($request->getContent());
    }

}
