<?php
namespace App\Core;

class Controller {
    protected function view($path, $data = []) {
        extract($data);
        include __DIR__ . '/../../views/' . $path;
    }

    protected function redirect($url) {
        header('Location: ' . $url);
        exit;
    }
}
