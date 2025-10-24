<?php
namespace App\Repositories;

use App\Core\Database;
use App\Models\UserExtended;
use PDO;

class UserRepositoryExtended {
    private $pdo;
    private $table = 'usuarios';

    public function __construct() {
        $this->pdo = Database::getConnection();
    }

    public function find($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE id = :id");
        $stmt->execute(['id'=>$id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($r) return new UserExtended($r);
        return null;
    }

    public function findByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE email = :email LIMIT 1");
        $stmt->execute(['email'=>$email]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($r) return new UserExtended($r);
        return null;
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} (nome,email,senha,idade,sexo,peso,altura,objetivo,nivel_atividade,restricao_alimentar,pontos) VALUES (:nome,:email,:senha,:idade,:sexo,:peso,:altura,:objetivo,:nivel_atividade,:restricao_alimentar,:pontos)");
        $stmt->execute([
            'nome'=>$data['nome'],
            'email'=>$data['email'],
            'senha'=>password_hash($data['senha'], PASSWORD_DEFAULT),
            'idade'=>$data['idade'] ?? null,
            'sexo'=>$data['sexo'] ?? null,
            'peso'=>$data['peso'] ?? null,
            'altura'=>$data['altura'] ?? null,
            'objetivo'=>$data['objetivo'] ?? null,
            'nivel_atividade'=>$data['nivel_atividade'] ?? null,
            'restricao_alimentar'=>$data['restricao_alimentar'] ?? null,
            'pontos'=>$data['pontos'] ?? 0
        ]);
        return $this->pdo->lastInsertId();
    }

    public function update($id,$data) {
        $fields = ['nome','email','idade','sexo','peso','altura','objetivo','nivel_atividade','restricao_alimentar','pontos'];
        $sets = []; $params = [];
        foreach($fields as $f){ if(isset($data[$f])){ $sets[] = "$f=:$f"; $params[$f]=$data[$f]; } }
        if(isset($data['senha']) && strlen($data['senha'])>0){ $sets[]='senha=:senha'; $params['senha']=password_hash($data['senha'],PASSWORD_DEFAULT); }
        $params['id']=$id;
        $sql = "UPDATE {$this->table} SET " . implode(',', $sets) . " WHERE id=:id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public function setPasswordResetToken($email,$token,$expires_at) {
        // Ensure column reset_token, reset_expires exist in DB; we will add migration
        $stmt = $this->pdo->prepare("UPDATE {$this->table} SET reset_token=:token, reset_expires=:expires WHERE email=:email");
        return $stmt->execute(['token'=>$token,'expires'=>$expires_at,'email'=>$email]);
    }

    public function getByResetToken($token) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE reset_token=:token AND reset_expires > NOW() LIMIT 1");
        $stmt->execute(['token'=>$token]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($r) return new UserExtended($r);
        return null;
    }

    public function clearResetToken($id) {
        $stmt = $this->pdo->prepare("UPDATE {$this->table} SET reset_token=NULL, reset_expires=NULL WHERE id=:id");
        return $stmt->execute(['id'=>$id]);
    }
}
