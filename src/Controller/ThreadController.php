<?php

namespace App\Controller;

use Auth0\SDK\Auth0;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Services\BoardService;

class ThreadController extends AbstractController
{
    public function __construct(
        private readonly BoardService $boardService
    ) {

    }

    #[Route('/', name: 'app_index')]
    public function index()
    {
        $boards = $this->boardService->fetchBoards();
        return $this->render("unlogged/index.html.twig", ["boards"=>$boards]);
    }
    // #[Route("/404", name: 'app_404')]
    // public function notFound()
    // {
    //     return $this->render("anon/404.html.twig");
    // }
    #[Route('/board/{board}', name: 'app_unlogged')]
    public function board($board)
    {
        if ($this->boardService->checkIfBoardExists((string) $board)) {
            return $this->render("anon/board.html.twig");
        }
        // var_dump($board);
        return $this->redirectToRoute("app_404");
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
    // #[Route("/login", name: "app_login")]
    // public function login()
    // {
    //     return new Response("e");
    //     // return $this->render("logged/login.html.twig");
    // }
}