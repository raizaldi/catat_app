<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');


$routes->group('api', ['filter' => 'auth'], function ($routes) {
    $routes->group('coa', function ($routes) {
        $routes->get('/', 'ChartOfAccountController::index');
        $routes->post('/', 'ChartOfAccountController::create');
        $routes->get('(:num)', 'ChartOfAccountController::show/$1');
        $routes->put('(:num)', 'ChartOfAccountController::update/$1');
        $routes->delete('(:num)', 'ChartOfAccountController::delete/$1');
    });
});

$routes->post('api/register', 'AuthController::register');
$routes->post('api/login', 'AuthController::login');

