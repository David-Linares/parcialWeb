app.controller('adminController', function($scope, adminService, SessionService){

	var profileUser = SessionService.getCookieObject('profileuser');
	
	$scope.pregNuevoParcial = [];
	$scope.pregNuevo = {
		'rptasmultiples' : []
	}
	$scope.pregNuevo = {
		'listadoOpciones' : []
	}
	$scope.pregNuevo = {
		'listadoOpcionesdinamicas' : []
	}
	$scope.pregNuevo = {
		'opcArrastrable' : []
	}
	$scope.tipoRespuestas = [
		{
			'id': 1,
			'tiponombre': 'Opción Múltiple con única respuesta',
			'directiva': 'pregMultipleUnicaRpta'
		},
		{
			'id': 2,
			'tiponombre': 'Emparejar opciones',
			'directiva': 'preguntaEmparejar'
		},
		{
			'id': 3,
			'tiponombre': 'Arrastrar opciones',
			'directiva': 'pregArrastre'
		}
	]

	$scope.agregarPregunta = function(){
		$scope.newInstance = angular.copy($scope.pregNuevo);
		console.log($scope.newInstance)
		$scope.pregNuevoParcial.push($scope.newInstance);
	}
	
	$scope.agregarOpcionesListado = function(obj){
		if (!obj.listadoOpcionesdinamicas) {
			obj.listadoOpcionesdinamicas = [];
		};
		obj.listadoOpcionesdinamicas.push({});
		if (!obj.listadoOpciones) {
			obj.listadoOpciones = [];
		};
		obj.listadoOpciones.push({});
	}

	$scope.agregarOpcion = function(obj){
		console.log(obj)
		if (!obj.rptasmultiples) {
			obj.rptasmultiples = [];
		};
		obj.rptasmultiples.push({});
	}

	$scope.agregarTitulo = function(obj){
		console.log(obj)
		if (!obj.titulosPaneles) {
			obj.titulosPaneles = [];
		};
		obj.titulosPaneles.push({});
	}

	$scope.agregarArrastrable = function(obj){
		console.log(obj)
		if (!obj.opcArrastrable) {
			obj.opcArrastrable = [];
		};
		obj.opcArrastrable.push({});
	}
	$scope.guardarParcial = function(){
		console.log($scope.pregNuevoParcial);
		console.log(profileUser.curso_id)
		adminService.saveParcial($scope.pregNuevoParcial, profileUser.curso_id);
	}

})
