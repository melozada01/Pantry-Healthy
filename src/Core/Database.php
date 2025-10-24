<?php
namespace App\Core;

/** Singleton responsável por manter uma única instância PDO */
class Database {
    private static $pdo = null;

    public static function getConnection() {
        if (self::$pdo === null) {
            $cfg = include __DIR__ . '/../../config/database.php';
            $db = $cfg['mysql'];
            $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $db['host'], $db['database'], $db['charset']);
            try {
                self::$pdo = new \PDO($dsn, $db['username'], $db['password']);
                self::$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
                self::$pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
            } catch (\Exception $e) {
                // In production don't echo errors. For dev we show.
                die('DB Connection error: ' . $e->getMessage());
            }
        }
        return self::$pdo;
    }
}
