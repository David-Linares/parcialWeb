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

app.controller('parcialController', function($scope, parcialService, SessionService, $routeParams, $location){

	$scope.nota = parcialService.getNota($routeParams.idParcial);

	console.log($scope.nota);

})

app.controller('parcialController', function($scope, parcialService, SessionService, $routeParams, $location){

	var profileUser = SessionService.getCookieObject('profileuser');
	var dataUser = SessionService.getCookieObject('datasesion');

	console.log(profileUser);
	console.log(dataUser);

	var listadoParciales = parcialService.getParciales(profileUser.curso_id);

	$scope.listadoParciales = [];

	listadoParciales.$loaded().then(function(){
		angular.forEach(listadoParciales, function(value, key) {
          	$scope.listadoParciales.push(key);
       	});
	})

	if ($routeParams.idParcial) {

		$scope.parcial = parcialService.getParcial(profileUser.curso_id, $routeParams.idParcial);
		console.log($scope.parcial)
	};

	/*Sección preguntaas de arrastre*/
	$scope.listadoHardware = [];
	$scope.listadoSoftware = [];

	$scope.listadoOpciones = [
		{'opcion': 'Monitor', 'drag': true, 'rpta': 'hardware'},
		{'opcion': 'Mouse', 'drag': true, 'rpta': 'hardware'},
		{'opcion': 'Teclado', 'drag': true, 'rpta': 'hardware'},
		{'opcion': 'CPU', 'drag': true, 'rpta': 'hardware'},
		{'opcion': 'Antivirus', 'drag': true, 'rpta': 'software'},
		{'opcion': 'Word', 'drag': true, 'rpta': 'software'},
		{'opcion': 'Paint', 'drag': true, 'rpta': 'software'},
		{'opcion': 'Google Chrome', 'drag': true, 'rpta': 'software'},
		{'opcion': 'Impresora', 'drag': true, 'rpta': 'hardware'},
		{'opcion': 'Micrófono', 'drag': true, 'rpta': 'hardware'},
		{'opcion': 'Scanner', 'drag': true, 'rpta': 'hardware'},
		{'opcion': 'Bloc de notas', 'drag': true, 'rpta': 'software'},
		{'opcion': 'Mozilla Firefox', 'drag': true, 'rpta': 'software'},
	]

	

	$scope.calificarParcial = function(){
		var nota = 5;
		var totalPreg = 20;
		var notaopc = nota / 18;
		var notapar = 1;
		var notaarrastra = 1 / 13;
		var notaacumulada = 0;
		var cantok = 0;

		angular.forEach($scope.listadoHardware, function(opchardware){
			if (opchardware.rpta == 'hardware') {
				notaacumulada += notaarrastra;
				cantok += 1;
			};
		});

		angular.forEach($scope.listadoSoftware, function(opcsoftware){
			if (opcsoftware.rpta == 'software') {
				notaacumulada += notaarrastra;
				cantok += 1;
			};
		});

		angular.forEach($scope.parcial, function(value, key){
			console.log(value)
			if (value.tiporpta == "pregMultipleUnicaRpta") {
				if (value.rptauser == value.respuesta_correcta) {
					notaacumulada += notaopc;
					cantok += 1;
				};
			}else{
				angular.forEach(value.listadoOpciones, function(opcrpta, keyrpta){
					if (parseInt(opcrpta.rptauser) == (keyrpta + 1)) {
						notaacumulada += notaarrastra;
						cantok += 1;
					};
				});
			}
		})

		notaacumulada = Math.round(notaacumulada * 100) / 100

		$scope.parcial.listadoHardware = $scope.listadoHardware;
		$scope.parcial.listadoSoftware = $scope.listadoSoftware;

		$scope.parcial.contestadasok = cantok;
		$scope.parcial.nota = notaacumulada;

		console.log(cantok);
		console.log(notaacumulada);

		$scope.guardarParcial(angular.fromJson(angular.toJson($scope.parcial)));

	}

	$scope.guardarParcial = function(parcial){
		parcialService.responderParcial(parcial,  $routeParams.idParcial);
		$location.path('/user/parcial/nota/'+ $routeParams.idParcial);
	}
})
