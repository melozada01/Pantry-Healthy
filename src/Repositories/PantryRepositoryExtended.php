<?php
namespace App\Repositories;

use App\Core\Database;
use PDO;

class PantryRepositoryExtended {
    private $pdo;
    private $table = 'alimentos_usuario';

    public function __construct(){ $this->pdo = Database::getConnection(); }

    public function itemsForUser($user_id) {
        $stmt = $this->pdo->prepare("SELECT au.*, a.nome, a.calorias, a.proteinas, a.carboidratos, a.gorduras FROM {$this->table} au JOIN alimentos a ON a.id=au.alimento_id WHERE au.usuario_id=:uid");
        $stmt->execute(['uid'=>$user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addItem($user_id,$alimento_id,$quantidade) {
        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} (usuario_id,alimento_id,quantidade) VALUES (:u,:a,:q)");
        return $stmt->execute(['u'=>$user_id,'a'=>$alimento_id,'q'=>$quantidade]);
    }
}
