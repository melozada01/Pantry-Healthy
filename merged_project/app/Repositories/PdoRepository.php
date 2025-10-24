<?php
namespace App\Repositories;

use App\Models\Database;
use \PDO;

abstract class PdoRepository implements RepositoryInterface
{
    protected $pdo;
    protected $table;
    protected $modelClass;

    public function __construct()
    {
        $this->pdo = Database::getConnection();
    }

    public function all()
    {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table} ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE id = :id LIMIT 1");
        $stmt->execute(['id'=>$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create(array $data)
    {
        $keys = array_keys($data);
        $fields = implode(',', $keys);
        $placeholders = implode(',', array_map(function($k){return ':' . $k;}, $keys));
        $sql = "INSERT INTO {$this->table} ({$fields}) VALUES ({$placeholders})";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($data);
        return $this->find($this->pdo->lastInsertId());
    }

    public function update($id, array $data)
    {
        $sets = implode(',', array_map(function($k){return "$k = :$k";}, array_keys($data)));
        $sql = "UPDATE {$this->table} SET {$sets} WHERE id = :id";
        $data['id'] = $id;
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($data);
        return $this->find($id);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE id = :id");
        return $stmt->execute(['id'=>$id]);
    }
}
