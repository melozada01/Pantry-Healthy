<?php
namespace App\Controllers;

use App\Repositories\FoodRepository;

class FoodController extends BaseController
{
    protected $repo;

    public function __construct()
    {
        $this->repo = new FoodRepository();
    }

    public function index()
    {
        $foods = $this->repo->all();
        $this->view('foods/index', ['foods' => $foods, 'title' => 'Food items']);
    }

    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = [
                'name' => $_POST['name'] ?? '',
                'calories' => $_POST['calories'] ?? 0,
                'protein' => $_POST['protein'] ?? 0,
                'carbs' => $_POST['carbs'] ?? 0,
                'fat' => $_POST['fat'] ?? 0,
                'created_at' => date('Y-m-d H:i:s')
            ];
            $this->repo->create($data);
            header('Location: /foods');
            exit;
        }
        $this->view('foods/create', ['title' => 'Create food']);
    }
}
