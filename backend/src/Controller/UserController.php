<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Service\FileWriter;
use App\Helper\ControllerHelper;

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
     */
    public function createUser(FileWriter $userFile, Request $request): Response
    {
        $request_content = json_decode($request->getContent(), true);
        $userName = $request_content['userName'];

        $id = md5(random_int(1, 10000) . random_int(1, 10000));
        $user = ['id' => $id, 'userName' => $userName];

        $userFile->update($id, $user);

        return ControllerHelper::buildResponse($id, false);
    }
}
