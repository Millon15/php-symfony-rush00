<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Service\FileWriter;
use Symfony\Component\HttpClient\HttpClient;

/**
 * Class UserController
 * @package App\Controller
 */
class UserController
{
    /**
     * @param FileWriter $userFile
     * @param Request    $request
     *
     * @return Response
     * @throws \Exception
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function createUser(FileWriter $userFile, Request $request): Response
    {
        $request_content = json_decode($request->getContent(), true);
        $userName = $request_content['userName'];
        if (!$userName) {
            throw new \RuntimeException("Can't retreive user name!");
        }

        $client = HttpClient::create();
        $userId = '';
        $movies = [];
        for ($i = 0; $i < 10; ++$i) {
            if ($i === 0) {
                $i = 1;
            }
            $page = random_int($i * 10000, 99999);
            $userId .= $page;
            $response = $client->request('GET', "http://www.omdbapi.com/?i=tt00{$page}&apikey=3fe767b6");
            $movies[] = json_decode($response->getContent(), true);
        }

        $createdAt = date('d-m-Y H:i:s');
        $level = 0;
        $user = [
            'userId' => $userId,
            'userName' => $userName,
            'createdAt' => $createdAt,
            'level' => $level,
            'movies' => $movies
        ];

        $userFile->write($userId, $user);

        return new Response($userId);
    }
}
