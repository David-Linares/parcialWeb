app.directive('preguntaEmparejar', function(){  //Pregunta con emparejamiento de respuestas

	return {
		restrict: 'E',
		scope: {
			opcionesestaticas:'=',
			opcionesdinamicas:'='
		},
		templateUrl: "templates/respuestas/emparejar.html"
	}

})

app.directive('pregMultipleUnicaRpta', function(){ //Pregunta con opción múltiple con única respuesta.

	return {
		restrict: 'E',
		scope: {rptasmultiples:'='},
		templateUrl: "templates/respuestas/multiple_unica.html"
	}

})

app.directive('pregArrastre', function(){ //Pregunta con opción múltiple con única respuesta.

	return {
		restrict: 'E',
		scope: {
			titulospaneles: '=',
			opcionesarrastrables: '='
		},
		templateUrl: "templates/respuestas/arrastrar.html"
	}

})