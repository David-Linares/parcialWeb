var app = angular
                .module('parcialweb', 
                    ['ngRoute',
                    'firebase',
                    'ngCookies',
                    'ngDragDrop'])
                .config(function($routeProvider){
                    $routeProvider
                    .when('/', {templateUrl: 'templates/login.html', controller: 'loginController'})
                    .when('/user', {templateUrl: 'templates/parcial.html', controller: 'parcialController'})
                    .when('/user/parcial/listado', {templateUrl: 'templates/listadoParciales.html', controller: 'parcialController'})
                    .when('/user/parcial/:idParcial', {templateUrl: 'templates/parcial.html', controller: 'parcialController'})
                    .when('/registro', {templateUrl: 'templates/registro.html', controller: 'registroController'})
                    .when('/admin/parciales', {templateUrl: 'templates/admin.html', controller: 'adminController'})
                    .when('/admin/parciales/nuevo', {templateUrl: 'templates/nuevoParcial.html', controller: 'adminController'})
                    .when('/admin/parciales/listado', {templateUrl: 'templates/nuevoParcial.html', controller: 'adminController'})
                    .when('/superadmin', {templateUrl: 'templates/superadmin.html', controller: 'superAdminController'})
                        .otherwise({redirectTo: '/'});
                })
                .constant('firebaseUrl', 'https://parciales-web.firebaseIO.com')