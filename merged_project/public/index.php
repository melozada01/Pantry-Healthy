<?php
require __DIR__ . '/../vendor/autoload.php';

use App\Controllers\HomeController;
use App\Controllers\UserController;
use App\Controllers\GoalController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
    case '/':
        (new HomeController())->index();
        break;
    case '/login':
        (new UserController())->loginForm();
        break;
    case '/register':
        (new UserController())->registerForm();
        break;
    case '/auth/login':
        (new UserController())->login();
        break;
    case '/auth/register':
        (new UserController())->register();
        break;
    case '/metas1':
        (new GoalController())->metas1();
        break;
    case '/metas2':
        (new GoalController())->metas2();
        break;
    case '/metas3':
        (new GoalController())->metas3();
        break;
    case '/dashboard':
        (new HomeController())->dashboard();
        break;
    default:
        http_response_code(404);
        echo "Página não encontrada";
}
