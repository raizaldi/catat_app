<?php

namespace App\Controllers;

use CodeIgniter\Database\Exceptions\DataException;
use CodeIgniter\RESTful\ResourceController;
use App\Libraries\JwtLib;
use App\Models\UserModel;

class AuthController extends ResourceController
{

    protected $jwtLib;

    public function __construct()
    {
        $this->jwtLib = new JwtLib();
    }

    public function register()
    {
        try {

            $model = new UserModel();
            $data = $this->request->getPost();
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

            if ($model->insert($data)) {
                return $this->respondCreated(['message' => 'User registered successfully']);
            }
            return $this->fail('Registration failed');
        } catch (DataException $e) {
            throw new \RuntimeException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function AuthView()
    {
        try {
            return view('auth/index');
        } catch (DataException $e) {
            throw new \RuntimeException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function login()
    {
        try {
            $model = new UserModel();
            $data = $this->request->getJSON();
            $user = $model->where('email', $data->email)->first();

            if ($user && password_verify($data->password, $user['password'])) {
                $token = $this->jwtLib->createToken(['id' => $user['id'], 'email' => $user['email'], 'role' => $user['role']]);
                return $this->respond(['token' => $token, 'exp' => time() + 3600]);
            }
            return $this->failUnauthorized('Invalid credentials');
        } catch (DataException $e) {
            throw new \RuntimeException($e->getMessage(), $e->getCode(), $e);
        }
    }
}
