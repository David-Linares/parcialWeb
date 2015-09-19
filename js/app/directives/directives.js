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
		replace: true,
		scope: {
			rptasmultiples:'=',
			numparcial: '=',
			ngModel:'='
		},
		templateUrl: "templates/respuestas/multiple_unica.html",
		require: 'ngModel',
		link: function($scope, elem, attr, ctrl) {
			$scope.id = attr.ngModel;
			console.debug(attr.ngModel);
			console.debug($scope.$parent.$eval(attr.ngModel));
			var textField = $('input[radio]', elem).
			attr('ng-model', attr.ngModel).
			val($scope.$parent.$eval(attr.ngModel));

			$compile(textField)($scope.$parent);
		}
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