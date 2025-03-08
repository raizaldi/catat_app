<?php

namespace App\Controllers;

use CodeIgniter\Database\Exceptions\DataException;
use CodeIgniter\RESTful\ResourceController;

use App\Models\ChartOfAccount;

class ChartOfAccountController extends ResourceController
{
    protected $format = 'json';
    protected $model;

    public function __construct()
    {
        $this->model = new ChartOfAccount();
    }


    public function index()
    {
        try {
            $user = GetUserLogin();
            $coa = $this->model->findAll();
            return $this->respond(array('info'=>$user->email,'data' => $coa));
        } catch (DataException $e) {
            throw new \RuntimeException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function create()
    {
        try {
            $data = $this->request->getJSON();
            if ($this->model->insert($data)) {
                return $this->respondCreated($data);
            }
            return $this->fail('Failed to create');
        } catch (DataException $e) {
            throw new \RuntimeException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function show($id = null)
    {
        try {
            if ($id == null) {
                throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
            }
            return $this->respond($this->model->find($id));
        } catch (DataException $e) {
            throw new \RuntimeException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function update($id = null)
    {
        $data = $this->request->getRawInput();
        if ($this->model->update($id, $data)) {
            return $this->respond(['message' => 'Updated successfully']);
        }
        return $this->fail('Failed to update');
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['message' => 'Deleted successfully']);
        }
        return $this->fail('Failed to delete');
    }
}
