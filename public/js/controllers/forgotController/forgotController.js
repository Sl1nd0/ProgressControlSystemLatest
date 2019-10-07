
app.controller('forgotController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, createAccountService) {
    
    //alert('MALA');

    $scope.Retrieve = function()
    {
        let cellno = $scope.countrycode + $scope.telnumber;
        
        let Data = {
            email: $scope.email,
            number: cellno
        }

        alert(cellno);
        createAccountService.forgotPassword(JSON.stringify(Data))
        .then(function(response) {
            alert(response.data);
           
        });
    }

    $scope.GoBack = function()
    {
        $scope.email = '';
        $scope.countrycode = '';
        $scope.telnumber  = '';
        $location.path('/');
    }
    
});
