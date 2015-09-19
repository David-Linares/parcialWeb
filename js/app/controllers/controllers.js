function random_code(len){
	var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
	code = "";
	for (x=0; x < len; x++){
		rand = Math.floor(Math.random()*chars.length);
		code += chars.substr(rand, 1);
	}
	return code;
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
					$location.path('user/parcial/listado');
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

app.controller('registroController', function($scope, firebaseUrl,loginService, $location, logsService, cursoService, SessionService){
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
	var perfilTemp = {}

	$scope.registro = function(){
		loginService.registrar($scope.registrouser).then(function(dataLogin){
			console.log("Datos del Login")
			var perfilUser = loginService.getProfile(dataLogin.uid);
			perfilUser.$loaded(function(){
				console.log(perfilUser);
				if (perfilUser.perfil == "estudiante") {
					$location.path('user/parcial/listado');
				}else{
					$location.path('admin/parciales');
				}
				$.extend(perfilTemp, perfilUser);
				delete perfilTemp['$$conf'];
				SessionService.setCookieObject('datasesion', dataLogin);
				SessionService.setCookieObject('profileuser', perfilTemp);
			})
		})
	}
})

app.controller('superAdminController', function($scope){
	console.log("Hola Super Admin!!");
})


