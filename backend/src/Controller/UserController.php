<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class UserController
 * @package App\Controller
 */
class UserController
{
    /**
     * @Route("/create-user")
     * @return Response
     * @throws \Exception
     */
    public function createUser(): Response
    {
        return new Response(json_encode(['id' => random_int(1, 99999)]), 200, [
            'Access-Control-Allow-Origin' => '*',
        ]);
    }
}
