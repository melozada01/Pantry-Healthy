<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Repositories\UserRepositoryExtended;

class ProfileController extends Controller {
    private $repo;
    public function __construct(){ $this->repo = new UserRepositoryExtended(); }

    public function edit() {
        $id = $_GET['id'] ?? null;
        $user = $this->repo->find($id);
        if (!$user) die('Usuário não encontrado');
        $this->view('profile/edit.php',['user'=>$user]);
    }

    public function update() {
        $id = $_POST['id'] ?? null;
        $this->repo->update($id,$_POST);
        $this->redirect('?controller=profile&action=edit&id=' . urlencode($id));
    }

    public function imc() {
        $id = $_GET['id'] ?? null;
        $user = $this->repo->find($id);
        if (!$user) die('Usuário não encontrado');
        $imc = $user->imc();
        $cal = $user->suggested_calories();
        $this->view('profile/imc.php',['user'=>$user,'imc'=>$imc,'cal'=>$cal]);
    }

    // password reset (simple flow)
    public function requestReset() {
        $this->view('profile/request_reset.php',[]);
    }

    public function sendReset() {
        $email = $_POST['email'] ?? null;
        $user = $this->repo->findByEmail($email);
        if (!$user) { $this->view('profile/request_reset.php',['error'=>'Email não encontrado']); return; }
        $token = bin2hex(random_bytes(16));
        $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));
        $this->repo->setPasswordResetToken($email,$token,$expires);
        // In a real app we'd send email. For demo, show link.
        $link = (isset($_SERVER['REQUEST_SCHEME'])?$_SERVER['REQUEST_SCHEME']:'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . dirname($_SERVER['SCRIPT_NAME']) . '/?controller=profile&action=resetForm&token=' . $token;
        $this->view('profile/request_reset.php',['success'=>'Token gerado. Link de reset (demo): ' . $link]);
    }

    public function resetForm() {
        $token = $_GET['token'] ?? null;
        $user = $this->repo->getByResetToken($token);
        if (!$user) die('Token inválido ou expirado');
        $this->view('profile/reset_form.php',['user'=>$user,'token'=>$token]);
    }

    public function doReset() {
        $token = $_POST['token'] ?? null;
        $user = $this->repo->getByResetToken($token);
        if (!$user) die('Token inválido ou expirado');
        $pass = $_POST['senha'] ?? null;
        $this->repo->update($user->id,['senha'=>$pass]);
        $this->repo->clearResetToken($user->id);
        $this->view('profile/reset_success.php',['user'=>$user]);
    }
}
