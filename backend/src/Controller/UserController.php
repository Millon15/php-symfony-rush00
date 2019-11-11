<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Service\FileWriter;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * Class UserController
 * @package App\Controller
 */
class UserController extends AbstractController
{
    /**
     * @param FileWriter $userFile
     * @param Request    $request
     *
     * @return Response
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     * @throws \Exception
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
        $const = 1000000;
        for ($i = 0; $i < 10; ++$i) {
            $page = random_int($const / 1000, $const - 1);
            $page = (string)($const + $page);
            $page[0] = 0;
            do {
                $response = json_decode($client
                    ->request('GET', "http://www.omdbapi.com/?i=tt0{$page}&apikey=3fe767b6")
                    ->getContent(), true);
            } while ($response['Response'] !== 'True');

            $movie = [
                'poster' => (($response['Poster'] ?? 'N/A') === 'N/A')
                    ? 'https://eu.movieposter.com/posters/archive/main/13/MPW-6725'
                    : $response['Poster'],
                'name' => $response['Title'],
                'plot' => $response['Plot'] ?? 'N/A',
                'year' => $response['Year'] ?? 'N/A',
                'rated' => $response['Rated'] ?? 'N/A',
                'released' => $response['Released'] ?? 'N/A',
                'runtime' => $response['Runtime'] ?? 'N/A',
                'genre' => $response['Genre'] ?? 'N/A',
                'director' => $response['Director'] ?? 'N/A',
                'writer' => $response['Writer'] ?? 'N/A',
                'actors' => $response['Actors'] ?? 'N/A',
                'language' => $response['Language'] ?? 'N/A',
                'country' => $response['Country'] ?? 'N/A',
                'isDefeated' => false,
            ];

            $movies[] = $movie;
            $userId .= $page;
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

    public function savedGames(FileWriter $userFile): Response
    {
        $users = $userFile->read();

        $usersToReturn = [];
        foreach ($users as $user) {
            $usersToReturn[] = [
                'userName' => $user['userName'],
                'userId' => $user['userId'],
                'createdAt' => $user['createdAt'],
            ];
        }

        return $this->json($usersToReturn);
    }

    public function userProgress(FileWriter $userFile, Request $request): Response
    {
        $userId = json_decode($request->getContent(), true)['userId']
                           ?? $request->query->get('userId');
        if (!$userId) {
            throw new \RuntimeException("Can't retreive user id!");
        }
        $user = $userFile->read()[$userId] ?? null;
        if (!$user) {
            throw new \RuntimeException("Can't retreive user info for the user id: " . $userId);
        }

        return $this->json(['movies' => $user['movies']]);
    }
}
