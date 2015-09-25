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

app.controller('notaController', function($scope, parcialService, SessionService, $routeParams, $location){

	var dataUser = SessionService.getCookieObject('datasesion');

	$scope.nota = parcialService.getNota($routeParams.idParcial);

	var userId = dataUser.uid;

	$scope.usernota = null;

	console.log("hola")

	$scope.nota.$loaded(function(){
		angular.forEach($scope.nota, function(minota){		
			console.log(minota)	
			angular.forEach(minota, function(notauser){		
				$scope.usernota = notauser;
			})
		})
	})

})

app.controller('parcialController', function($scope, parcialService, SessionService, $routeParams, $location){

	var profileUser = SessionService.getCookieObject('profileuser');
	var dataUser = SessionService.getCookieObject('datasesion');
	$scope.listadoParciales = [];

	var listadoParciales = parcialService.getParciales(profileUser.curso_id);

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

	
	if ($routeParams.idParcial) {
		$scope.parcial = parcialService.getParcialEstudiante($routeParams.idParcial, dataUser.uid);

		$scope.parcial.$loaded(function(){
			if ($scope.parcial.length > 0) {
				$scope.parcial = $scope.parcial[0];
				$scope.respondidoxuser = true;
				$scope.listadoHardware = $scope.parcial.listadoHardware
				$scope.listadoSoftware = $scope.parcial.listadoSoftware
				console.log($scope.parcial);
				$scope.notaUser = $scope.parcial.nota
				delete $scope.parcial["listadoHardware"]
				delete $scope.parcial["listadoSoftware"]
				delete $scope.parcial["nota"]
				delete $scope.parcial["contestadasok"]
				console.log($scope.listadoOpciones)
			}else{
				$scope.parcial = parcialService.getParcial(profileUser.curso_id, $routeParams.idParcial);
				$scope.respondidoxuser = false;
			}
		})
	};


	listadoParciales.$loaded().then(function(){
		angular.forEach(listadoParciales, function(value, key) {
          	$scope.listadoParciales.push(key);
       	});
	})


	/*Sección preguntaas de arrastre*/
	$scope.listadoHardware = [];
	$scope.listadoSoftware = [];

	

	

	$scope.calificarParcial = function(){
		var nota = 5; //Nota Absoluta
		var totalPreg = 20; //Total preguntas parcial
		var notaxpunto = nota / totalPreg; //Nota para cada punto
		var notapar = 1;
		var notaarrastra = notaxpunto / 13;
		var notaemparej = notaxpunto / 5;
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
					notaacumulada += notaxpunto;
					cantok += 1;
				};
			}else{
				angular.forEach(value.listadoOpciones, function(opcrpta, keyrpta){
					if (parseInt(opcrpta.rptauser) == (keyrpta + 1)) {
						notaacumulada += notaemparej;
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

		$scope.guardarParcial($scope.parcial);

	}

	$scope.guardarParcial = function(parcial){
		parcialService.saveResponse(parcial,  $routeParams.idParcial, dataUser.uid);
		$location.path('/user/parcial/nota/'+ $routeParams.idParcial);
	}
})
