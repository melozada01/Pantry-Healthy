<?php
namespace App\Models;

class Database
{
    private static $pdo = null;

    public static function getConnection()
    {
        if (self::$pdo === null) {
            $config = require __DIR__ . '/../../config/database.php';
            if ($config['driver'] === 'sqlite') {
                $path = $config['sqlite']['database'];
                if (!file_exists($path)) {
                    // create empty sqlite file
                    if (!is_dir(dirname($path))) mkdir(dirname($path), 0777, true);
                    touch($path);
                }
                $dsn = 'sqlite:' . $path;
                self::$pdo = new \PDO($dsn);
                self::$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            } else {
                // mysql example
                $c = $config['mysql'];
                $dsn = "mysql:host={$c['host']};dbname={$c['database']};charset={$c['charset']}";
                self::$pdo = new \PDO($dsn, $c['username'], $c['password']);
                self::$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            }
        }
        return self::$pdo;
    }
}
