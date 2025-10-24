<?php
namespace App\Models;

class User {
    public $id;
    public $nome;
    public $email;
    public $senha;

    public function __construct($data = []) {
        if (!empty($data)) {
            $this->id = $data['id'] ?? null;
            $this->nome = $data['nome'] ?? null;
            $this->email = $data['email'] ?? null;
            $this->senha = $data['senha'] ?? null;
        }
    }
}
