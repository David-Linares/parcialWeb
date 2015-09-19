app.controller('parcialController', function($scope, parcialService, SessionService, $routeParams){

	var profileUser = SessionService.getCookieObject('profileuser');

	console.log(profileUser);

	var listadoParciales = parcialService.getParciales(profileUser.curso_id);

	$scope.listadoParciales = [];

	listadoParciales.$loaded().then(function(){
		angular.forEach(listadoParciales, function(value, key) {
          	$scope.listadoParciales.push(key);
       	});
	})

	if ($routeParams.idParcial) {

		$scope.parcial = parcialService.getParcial(profileUser.curso_id, $routeParams.idParcial);

	};


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
