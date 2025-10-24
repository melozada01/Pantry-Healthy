<?php
namespace App\Controllers;
use App\Models\User;

class UserController extends BaseController {
    public function loginForm() {
        $this->render('users/login');
    }
    public function registerForm() {
        $this->render('users/register');
    }
    public function login() {
        session_start();
        $email = $_POST['email'] ?? '';
        $senha = $_POST['senha'] ?? '';
        $user = User::findByEmail($email);
        if ($user && password_verify($senha, $user['senha'])) {
            $_SESSION['user_id'] = $user['id'];
            header('Location: /metas1');
        } else {
            $_SESSION['error'] = 'Credenciais inválidas';
            header('Location: /login');
        }
    }
    public function register() {
        session_start();
        $nome = $_POST['nome'] ?? '';
        $email = $_POST['email'] ?? '';
        $senha = $_POST['senha'] ?? '';
        if ($nome && $email && $senha) {
            $hash = password_hash($senha, PASSWORD_DEFAULT);
            User::create($nome,$email,$hash);
            $_SESSION['success'] = 'Cadastro realizado!';
            header('Location: /login');
        } else {
            $_SESSION['error'] = 'Preencha todos os campos';
            header('Location: /register');
        }
    }
}
