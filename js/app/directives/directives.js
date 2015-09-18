app.directive('preguntaEmparejar', function(){  //Pregunta con emparejamiento de respuestas

	return {
		restrict: 'E',
		//scope: {},
		template: 'templates/respuestas/emparejar.html'
	}

})

app.directive('pregMultipleUnicaRpta', function(){ //Pregunta con opción múltiple con única respuesta.

	return {
		restrict: 'E',
		//scope: {},
		template: 'templates/respuestas/multiple_unica.html'
	}

})

app.directive('pregArrastre', function(){ //Pregunta con opción múltiple con única respuesta.

	return {
		restrict: 'E',
		//scope: {},
		template: 'templates/respuestas/arrastre.html'
	}

})