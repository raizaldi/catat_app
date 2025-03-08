<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use App\Libraries\JwtLib;

class JWTAuthMiddleware implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');
        if (!$authHeader) {
            return response()->setJSON(['message' => 'No token provided'])->setStatusCode(401);
        }

        $token = explode(' ', $authHeader)[1];
        $jwtLib = new JwtLib();
        
        try {
            $decoded = $jwtLib->decodeToken($token);
            service('request')->setGlobal('user', (array) $decoded->data);
        } catch (\Exception $e) {
            return response()->setJSON(['message' => 'Invalid token'])->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak perlu implementasi
    }
}
