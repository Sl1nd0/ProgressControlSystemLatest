
app.controller('confirmController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, createAccountService) {

    $http.get('ConfirmAccount').then(function(response) {
        //alert(response.data.msg + " CODE " + response.data.verify);

        var Data = response.data.Data;
        var verification = response.data.verify;
        var verification2 = undefined;
        
        if ($sessionStorage.verification != undefined)
        {
            verification = $sessionStorage.verification;   
        }

        setTimeout(function() { verification =  Math.floor((Math.random() * 9) + 1 + 600 + (Math.random() * 200) 
            + 100 + (Math.random() * 300000)+100000);
           // $sessionStorage.verification = undefined;
            //alert('new one 1 11 is ' + verification);
            //$window.reload();
            }, 40000);
        
        $scope.refresh = function()
        {
            setTimeout(function() { verification =  Math.floor((Math.random() * 9) + 1 + 600 + (Math.random() * 200) 
                + 100 + (Math.random() * 300000)+100000);
                $sessionStorage.verification = undefined;
               // alert('new one 1 11 is ' + verification);
                //$window.reload();
            }, 40000);
        }

        //alert('new one 1 is ' + verification);

        $scope.resendVerification = function()
        {
            let newData = {
                email: Data.email,
                password: Data.password
            }
            
            alert('My TEST! --> * ' + newData.email);
            createAccountService.resendVerification(JSON.stringify(Data))
            .then(function(response) {
                
                verification = response.data.randv; 
                $sessionStorage.verification = verification;         
                alert(response.data.msg);
                $location.path('/confirm');
                return $scope.refresh();
            });     
        }

        alert(verification2 + 'As  v 2 ');
        $scope.Confirm = function()
        { 
            alert(verification + ' AZ my code !!');
            if ($scope.vcode.trim() == verification)
            {
                $sessionStorage.verification = undefined;
                createAccountService.Activate(JSON.stringify(Data))
                .then(function(response) {
                    if (response.status != 200)
                    {
                        alert(response.data);
                    } else {
                        alert(response.data);
                        $scope.Clearall();
                        $location.path('/');
                    }
                });
            } else {
                alert('You have entered a wrong verification code');
            }
        }

        $scope.Clearall = function()
        {
            $scope.vcode = '';
        }

        $scope.GoBack = function()
        { 
            $sessionStorage.verification = undefined;
            $scope.Clearall();  
            $location.path('/create');
        }
       // setTimeout
    });
});
