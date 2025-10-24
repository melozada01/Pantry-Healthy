<?php
namespace App\Repositories;

use App\Core\Database;
use PDO;

class FoodRepositoryExtended {
    private $pdo;
    private $table = 'alimentos';

    public function __construct() { $this->pdo = Database::getConnection(); }

    public function all() {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table} ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE id=:id");
        $stmt->execute(['id'=>$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function searchByName($q) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE nome LIKE :q LIMIT 50");
        $stmt->execute(['q'=>'%'.$q.'%']);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
