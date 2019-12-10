
app.controller('forgotController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, createAccountService) {
    
    //alert('MALA');

    $scope.Retrieve = function()
    {
        let cellno = $scope.countrycode + $scope.telnumber;
        
        let Data = {
            email: $scope.email,
            number: cellno
        }
		
		if (!Data.email || !$scope.countrycode || !$scope.telnumber)
		{
			alert('Fill in all details correctly');
		} else {
			
        //alert(cellno);
        createAccountService.forgotPassword(JSON.stringify(Data))
        .then(function(response) {
            alert(response.data);
           
        });
		
		}
    }

    $scope.GoBack = function()
    {
        $scope.email = '';
        $scope.countrycode = '';
        $scope.telnumber  = '';
        $location.path('/');
    }
    
});
