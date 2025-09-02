<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Repositories\UserRepositoryExtended;

class GamificationController extends Controller {
    private $repo;
    public function __construct(){ $this->repo = new UserRepositoryExtended(); }

    public function show() {
        $id = $_GET['id'] ?? null;
        $user = $this->repo->find($id);
        if (!$user) die('Usuário não encontrado');
        $this->view('gamification/show.php',['user'=>$user]);
    }

    public function addPoints() {
        $id = $_POST['id'] ?? null;
        $points = intval($_POST['points'] ?? 10);
        $user = $this->repo->find($id);
        if (!$user) die('Usuário não encontrado');
        $new = intval($user->pontos) + $points;
        $this->repo->update($id,['pontos'=>$new]);
        $this->redirect('?controller=gamification&action=show&id=' . urlencode($id));
    }
}
