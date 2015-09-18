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

app.controller('loginController', function($scope, firebaseUrl,loginService, $location, logsService, SessionService){
	$scope.loginuser = {'email':'', 'password': ''};
	var perfilTemp = {}
	$scope.login = function(){
		loginService.login($scope.loginuser).then(function(data){
			console.log(data)
			var perfilUser = loginService.getProfile(data.uid);
			perfilUser.$loaded(function(){
				$.extend(perfilTemp, perfilUser);
				delete perfilTemp['$$conf'];
				SessionService.setCookieObject('datasesion', data);
				SessionService.setCookieObject('profileuser', perfilTemp);
				if (perfilUser.perfil == "estudiante") {
					$location.path('user');
				}else{
					$location.path('admin/parciales');
				};
			})
		},function(error){
			console.log("error");
			console.log(error);
		})
	}
})

app.controller('registroController', function($scope, firebaseUrl,loginService, $location, logsService, cursoService, $cookies){
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
			var perfilUser = loginService.getProfile(dataLogin.uid);
			perfilUser.$loaded(function(){
				console.log(perfilUser);
				if (perfilUser.perfil == "estudiante") {
					$location.path('user');
				}else{
					$location.path('admin/parciales');
				}
				$cookies.put('datasesion', data);
			})
		})
	}
})

app.controller('superAdminController', function($scope){
	console.log("Hola Super Admin!!");
})

app.controller('parcialController', function($scope, parcialService){
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
})

