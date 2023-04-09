<?php

namespace App\Controller;

use Auth0\SDK\Auth0;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoggedController extends AbstractController
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
    
    #[Route('/dashboard', name: 'app_dashboard')]
    public function index(): Response
    {

        $session = $this->auth0->getCredentials();
        if($session === null){
            return $this->redirectToRoute("app_login");
        }
        // var_dump($this->auth0->exchange());
        return $this->render("logged/dashboard.html.twig");
    }
    #[Route("/logout", name: "app_logout")]
    public function logout(){
        // var_dump();
        // die();
        // header('Location: '.$this->auth0->logout("http://judasz.ddns.net:8000"));
        // exit;
        return $this->redirect($this->auth0->logout("http://judasz.ddns.net:8000"));
    }


}
