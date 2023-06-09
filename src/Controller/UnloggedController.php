<?php

namespace App\Controller;

use Auth0\SDK\Auth0;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UnloggedController extends AbstractController
{
    private Auth0 $auth0;
    public function __construct(){
        $this->auth0 = new Auth0([
            'domain' => $_ENV['AUTH0_DOMAIN'],
            'clientId' => $_ENV['AUTH0_CLIENT_ID'],
            'clientSecret' => $_ENV['AUTH0_CLIENT_SECRET'],
            'cookieSecret' => $_ENV['AUTH0_COOKIE_SECRET']
        ]);
    }
    #[Route('/', name: 'app_unlogged')]
    public function index()
    {
        return $this->render("unlogged/index.html.twig");
    }

    #[Route('/login', name: 'app_login')]
    public function login(){
        return $this->redirect($this->auth0->login("http://judasz.ddns.net:8000/authenticate"));
    }

    #[Route('/authenticate', name: 'app_authenticate')]
    public function authenticate(){
        $this->auth0->exchange("http://judasz.ddns.net:8000/authenticate");
        return $this->redirectToRoute("app_dashboard");
    }

}
