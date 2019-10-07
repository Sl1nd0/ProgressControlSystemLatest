
app.controller('loginController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, chatSocket, loginService) {
    
    $scope.logIN = function()
    {
        //alert('I am livel!');
        //SET My css
       
        //SET My css

        $scope.Check = false;

        let data = {
            email: $scope.email,
            password: $scope.password
        }
	$sessionStorage.displayPosition = undefined;

        loginService.loginAccount(JSON.stringify(data))
        .then(function (response)
        {
           // alert(response.data.msg)
            if (response.data.code == '00')
            {
                //alert('Status 0');
                $location.path('/activate');
            } else if (response.data.code == '01') {
                //alert('Status 01'); //Here it is already active 

                //RETURN TO Make V and Contr ........
                
                $location.path('/employees');
            } else {
                alert(response.data);
                $location.path('/');
            }
        }) 
        
        chatSocket.on('alarm', function(data) {  
             //   console.log('TXT-TXTTT');
        });
                
                       
    }

});
