<?php
namespace App\Controllers;

class BaseController
{
    protected function view($path, $data = [])
    {
        extract($data);
        include __DIR__ . '/../Views/layouts/header.php';
        include __DIR__ . '/../Views/' . $path . '.php';
        include __DIR__ . '/../Views/layouts/footer.php';
    }

    protected function json($data)
    {
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
