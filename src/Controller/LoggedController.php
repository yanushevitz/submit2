<?php

namespace App\Controller;

use App\Services\UserService;
use Auth0\SDK\Auth0;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoggedController extends AbstractController
{
    private Auth0 $auth0;
    public function __construct(
        private readonly UserService $userService
    ) {
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
        $user = $this->auth0->getUser();
        if ($user === null) {
            return $this->redirectToRoute("app_login");
        }

        if (!$this->userService->getProfileId($user['sub'])) {
            $this->userService->createProfile($user['sub'], $user['nickname']);
        }

        return $this->render('logged/react.html.twig');
    }
    #[Route("/logout", name: "app_logout")]
    public function logout()
    {
        return $this->redirect($this->auth0->logout("http://judasz.ddns.net:8000"));
    }

    #[Route("/post/{id}", name: "app_post")]
    public function post($id)
    {
        return $this->render("logged/post.html.twig");
    }

    #[Route("/profile/{id}", name: "app_profile")]
    public function profile($id)
    {
        return $this->render('logged/profile.html.twig');
    }

}