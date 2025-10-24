<?php
namespace App\Models;
use App\Models\Database;

class User {
    public static function findByEmail($email) {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
    public static function create($nome,$email,$senha) {
        $db = Database::getConnection();
        $stmt = $db->prepare("INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?)");
        return $stmt->execute([$nome,$email,$senha]);
    }
}
