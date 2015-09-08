function random_code(len){
	var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
	code = "";
	for (x=0; x < len; x++){
		rand = Math.floor(Math.random()*chars.length);
		code += chars.substr(rand, 1);
	}
	return code;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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
		'user':{
			'nombre': '',
			'email': '',
			'password': '',
			'rpassword': '',
			'isEstudiante': false,
		},
		'curso': {
			'nombre': '',
			'codigo':random_code(8),
			'password':''
		},
		'estudiante': {
			'codigo': '',
			'password': ''
		}
	}

	$scope.registro = function(){
		loginService.registrar($scope.registrouser).then(function(dataLogin){
			console.log("Datos del Login")
			console.log(dataLogin)
		})
	}
}])

app.controller('superAdminController', ['$scope', function($scope){
	console.log("Hola Super Admin!!");
}])

app.controller('parcialController', ['$scope', 'parcialService', function($scope, parcialService){
	$scope.test_preguntas = [
		{
			"pregunta": "Que es un computador",
			"respuesta_user": "preg1",
			"opciones":  [
							{ "respuesta":"Opc 1","check":false},
							{ "respuesta":"Opc 2","check":false},
							{ "respuesta":"Opc 3","check":false},
							{ "respuesta":"Opc 4","check":false},
						]
		},
		{
			"pregunta": "Partes de un computador",
			"respuesta_user": "preg2",
			"opciones":  [
							{ "respuesta":"Opc 1","check":false},
							{ "respuesta":"Opc 2","check":false},
							{ "respuesta":"Opc 3","check":false},
							{ "respuesta":"Opc 4","check":false},
						]
		},
		{
			"pregunta": "Que es Software",
			"respuesta_user": "preg3",
			"opciones":  [
							{ "respuesta":"Opc 1","check":false},
							{ "respuesta":"Opc 2","check":false},
							{ "respuesta":"Opc 3","check":false},
							{ "respuesta":"Opc 4","check":false},
						]
		},
		{
			"pregunta": "Que es Hardware",
			"respuesta_user": "preg4",
			"opciones":  [
							{ "respuesta":"Opc 1","check":false},
							{ "respuesta":"Opc 2","check":false},
							{ "respuesta":"Opc 3","check":false},
							{ "respuesta":"Opc 4","check":false},
						]
		},
		{
			"pregunta": "Que es Internet",
			"respuesta_user": "preg5",
			"opciones":  [
							{ "respuesta":"Opc 1","check":false},
							{ "respuesta":"Opc 2","check":false},
							{ "respuesta":"Opc 3","check":false},
							{ "respuesta":"Opc 4","check":false},
						]
		},
	]

	$scope.test_preguntas = shuffle($scope.test_preguntas);
	console.log($scope.test_preguntas)
	$scope.guardarParcial = function(){
		parcialService.guardarParcial($scope.test_preguntas);
	}
}])

