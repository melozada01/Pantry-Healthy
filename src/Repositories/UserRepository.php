<?php
namespace App\Repositories;

use App\Core\Database;
use App\Models\User;

class UserRepository {
    private $pdo;
    private $table = 'usuarios';

    public function __construct() {
        $this->pdo = Database::getConnection();
    }

    public function all() {
        $stmt = $this->pdo->query("SELECT id, nome, email FROM {$this->table} ORDER BY id DESC");
        return $stmt->fetchAll();
    }

    public function find($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch();
        if ($data) return new User($data);
        return null;
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} (nome, email, senha) VALUES (:nome, :email, :senha)");
        $stmt->execute([
            'nome' => $data['nome'],
            'email' => $data['email'],
            'senha' => password_hash($data['senha'], PASSWORD_DEFAULT)
        ]);
        return $this->pdo->lastInsertId();
    }

    public function update($id, $data) {
        if (isset($data['senha']) && strlen($data['senha'])>0) {
            $stmt = $this->pdo->prepare("UPDATE {$this->table} SET nome=:nome, email=:email, senha=:senha WHERE id=:id");
            $params = ['nome'=>$data['nome'],'email'=>$data['email'],'senha'=>password_hash($data['senha'], PASSWORD_DEFAULT),'id'=>$id];
        } else {
            $stmt = $this->pdo->prepare("UPDATE {$this->table} SET nome=:nome, email=:email WHERE id=:id");
            $params = ['nome'=>$data['nome'],'email'=>$data['email'],'id'=>$id];
        }
        return $stmt->execute($params);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
