<?php

use CodeIgniter\HTTP\RequestInterface;
use App\Libraries\JwtLib;


if (!function_exists('claim')) {

    function GetUserLogin() 
    {
        try {
            $request = \Config\Services::request();
            $authHeader = $request->getHeaderLine('Authorization');
            $token = explode(' ', $authHeader)[1];
            $jwtLib = new JwtLib();
            $decoded = $jwtLib->decodeToken($token);
            return $decoded->data;
        } catch (\Exception $e) {
            return response()->setJSON(['message' => 'Invalid token'])->setStatusCode(401);
        }
    }
}