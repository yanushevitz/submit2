<?php

namespace App\Controller;

use Auth0\SDK\Auth0;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ThreadController extends AbstractController
{
    #[Route('/', name: 'app_unlogged')]
    public function index()
    {
        return $this->render("unlogged/index.html.twig");
    }
    #[Route('/dashboard', name: 'app_dashboard')]
    public function dashboard(): Response
    {
        return $this->render('logged/react.html.twig');
    }

    #[Route("/post/{id}", name: "app_post")]
    public function post($id)
    {
        return $this->render("logged/post.html.twig");
    }
    #[Route("/login", name: "app_login")]
    public function login()
    {
        return new Response("e");
        // return $this->render("logged/login.html.twig");
    }
}