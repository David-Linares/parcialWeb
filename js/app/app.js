var app = angular
                .module('parcialweb', 
                    ['ngRoute',
                    'firebase'])
                .config(function($routeProvider){
                    $routeProvider
                    .when('/', {templateUrl: 'templates/login.html', controller: 'loginController'})
                    .when('/registro', {templateUrl: 'templates/registro.html', controller: 'registroController'})
                    .when('/superadmin', {templateUrl: 'templates/superadmin.html', controller: 'superAdminController'})
                        .otherwise({redirectTo: '/'});
                })
                .constant('firebaseUrl', 'https://parciales-web.firebaseIO.com')