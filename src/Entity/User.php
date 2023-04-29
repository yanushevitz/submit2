<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $auth0 = null;

    #[ORM\Column(length: 255)]
    private ?string $nickname = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuth0(): ?string
    {
        return $this->auth0;
    }

    public function setAuth0(string $auth0): self
    {
        $this->auth0 = $auth0;

        return $this;
    }

    public function getNickname(): ?string
    {
        return $this->nickname;
    }

    public function setNickname(string $nickname): self
    {
        $this->nickname = $nickname;

        return $this;
    }
}
