app.controller('headerController', function($scope, firebaseUrl,loginService, $location, SessionService){

	$scope.logueado = loginService.logueado;

	console.log($scope.logueado());

	$scope.user = loginService.user;

	$scope.logout = function(){
		SessionService.unsetCookie('datasesion');
		SessionService.unsetCookie('profileuser');
		loginService.cerrarSesion();
	}
})