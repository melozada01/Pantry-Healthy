<?php
require_once __DIR__ . '/../vendor/autoload.php';

$controller = $_GET['controller'] ?? 'user';
$action = $_GET['action'] ?? 'index';

// Mapping controller name to class
$map = [
    'user'=>'App\\Controllers\\UserController',
    'profile'=>'App\\Controllers\\ProfileController',
    'recipe'=>'App\\Controllers\\RecipeController',
    'gamification'=>'App\\Controllers\\GamificationController',
    'report'=>'App\\Controllers\\ReportController',
    'payment'=>'App\\Controllers\\PaymentController'
];

if (!isset($map[strtolower($controller)])) {
    http_response_code(404); die('Controller not found');
}

$class = $map[strtolower($controller)];
$c = new $class();

if (!method_exists($c,$action)) { http_response_code(404); die('Action not found'); }

$c->{$action}();
