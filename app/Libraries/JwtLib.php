<?php
namespace App\Libraries;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtLib
{
    private $key;

    public function __construct()
    {
        $this->key = getenv('JWT_SECRET');
    }

    public function createToken($data)
    {
        $payload = [
            'iss' => base_url(),
            'aud' => base_url(),
            'iat' => time(),
            'exp' => time() + 3600,
            'data' => $data
        ];
        return JWT::encode($payload, $this->key, 'HS256');
    }

    public function decodeToken($token)
    {
        return JWT::decode($token, new Key($this->key, 'HS256'));
    }
}
