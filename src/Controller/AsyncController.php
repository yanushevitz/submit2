<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AsyncController extends AbstractController
{
    #[Route('/async/posts', name: 'async_posts')]
    public function index(): Response
    {
        return $this->render('async/index.html.twig', [
            'controller_name' => 'AsyncController',
        ]);
    }
}
