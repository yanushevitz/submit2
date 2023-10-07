<?php

namespace App\Controller;

use App\Services\BoardService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AdminController extends AbstractController
{

    public function __construct(
        private readonly BoardService $boardService
    ){

    }
    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('threads');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error, "boards" => $this->boardService->fetchBoards()]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        // return $this->redirectToRoute("app_index");
        // throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
