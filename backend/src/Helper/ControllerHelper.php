<?php
declare(strict_types=1);

namespace App\Helper;

use Symfony\Component\HttpFoundation\Response;

/**
 * Class ControllerHelper
 * @package App\Controller
 */
class ControllerHelper
{
    /**
     * @param      $content
     * @param bool $toJsonEncode
     *
     * @return Response
     */
    public static function buildResponse($content, bool $toJsonEncode = true): Response
    {
        return new Response($toJsonEncode ? json_encode($content) : $content, 200, [
            'Access-Control-Allow-Origin' => '*',
            'content-type' => 'application/json',
        ]);
    }
}
