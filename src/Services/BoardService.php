<?php

namespace App\Services;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Boards;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

// use SerializerInterface;

class BoardService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly SerializerInterface $serializer
    ) {

    }

    public function checkIfBoardExists(string $board): bool
    {
        return (bool) $this->entityManager->getRepository(Boards::class)->findOneBy(['symbol' => $board]);

    }

    public function fetchBoards(): mixed
    {
        return $this->entityManager->getRepository(Boards::class)->findAll();
        // return $this->serializer->normalize($boards);

    }

}