<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->get('/auth', 'AuthController::AuthView');

$routes->group('api', function ($routes) {
 
    $routes->post('login', 'AuthController::login');

    $routes->group('coa', ['filter' => 'auth'], function ($routes) {
        $routes->post('register', 'AuthController::register');

        $routes->get('/', 'ChartOfAccountController::index');
        $routes->post('/', 'ChartOfAccountController::create');
        $routes->get('(:num)', 'ChartOfAccountController::show/$1');
        $routes->put('(:num)', 'ChartOfAccountController::update/$1');
        $routes->delete('(:num)', 'ChartOfAccountController::delete/$1');
    });
});


