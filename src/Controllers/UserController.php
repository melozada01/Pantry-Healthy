<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Repositories\UserRepository;

class UserController extends Controller {
    private $repo;

    public function __construct() {
        $this->repo = new UserRepository();
    }

    public function index() {
        $users = $this->repo->all();
        $this->view('users/list.php', ['users'=>$users]);
    }

    public function create() {
        $this->view('users/form.php', ['user'=>null, 'action'=>'create']);
    }

    public function store() {
        $this->repo->create($_POST);
        $this->redirect('?controller=user&action=index');
    }

    public function edit() {
        $id = $_GET['id'] ?? null;
        $user = $this->repo->find($id);
        if (!$user) die('Usuário não encontrado');
        $this->view('users/form.php', ['user'=>$user, 'action'=>'update']);
    }

    public function update() {
        $id = $_POST['id'] ?? null;
        $this->repo->update($id, $_POST);
        $this->redirect('?controller=user&action=index');
    }

    public function delete() {
        $id = $_GET['id'] ?? null;
        $this->repo->delete($id);
        $this->redirect('?controller=user&action=index');
    }
}
