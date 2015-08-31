function random_code(len){
	var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
	code = "";
	for (x=0; x < len; x++){
		rand = Math.floor(Math.random()*chars.length);
		code += chars.substr(rand, 1);
	}
	return code;
}


app.controller('headerController', ['$scope','firebaseUrl','loginService', '$location', function($scope, firebaseUrl,loginService, $location){
	$scope.logueado = loginService.logueado;

	console.log($scope.logueado());
}])

app.controller('loginController', ['$scope','firebaseUrl','loginService', '$location', 'logsService', function($scope, firebaseUrl,loginService, $location, logsService){
	$scope.loginuser = {'email':'super@parcialweb.com', 'password': 'super12345'};
	$scope.login = function(){
		loginService.login($scope.loginuser).then(function(data){
			if ($scope.loginuser.email.indexOf('super') != -1) {
				console.log(data);
				logsService.setLog(data.uid, 'Inicio de Sesión de SuperAdmin', navigator.userAgent, myip);
				$location.path('/superadmin');
				$scope.loginuser = {};
			};
		},function(error){
			console.log("error");
			console.log(error);
		})
	}
}])

app.controller('registroController', ['$scope','firebaseUrl','loginService', '$location', 'logsService', 'cursoService', function($scope, firebaseUrl,loginService, $location, logsService, cursoService){
	$scope.registrouser = {
		'nombre': '',
		'email': '',
		'password': '',
		'rpassword': '',
		'isEstudiante': false,
		'email': '',
		'email': '',
		'curso': {
			'nombre': '',
			'codigo':random_code(8),
			'password':'',
			'estudiante': {
				'codigo': '',
				'password': ''
			}
		}
	}

	$scope.registro = function(){

	}
}])

app.controller('superAdminController', ['$scope', function($scope){
	console.log("Hola Super Admin!!");
}])