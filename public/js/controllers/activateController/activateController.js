
app.controller('activateController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, createAccountService) {
    $http.get('getLoggedIn').then(function(response) {

        if (!response.data.Code)
        {
            alert(response.data);
        } else {
        var myData = response.data.Data;
        var verification = response.data.verify;
        var verification2 = undefined;

        //alert('My successor !!!');

        var newData = {
            idnumber: myData.rows[0].useridentity,
            name: myData.rows[0].username,
            number: myData.rows[0].usernumber,
            email: myData.rows[0].useremail,
            telnumber: myData.rows[0].usernumber,
            password: myData.rows[0].userpassword
        }

        $scope.resendVerification = function()
        {   
            //alert('My TEST! --> * ' + newData.email);
			//alert('Im re-sending');
            createAccountService.resendVerification(JSON.stringify(newData))
            .then(function(response) {

            setTimeout(function() { verification =  Math.floor((Math.random() * 9) + 1 + 600 + (Math.random() * 200) 
                + 100 + (Math.random() * 300000)+100000); 
                //alert('New 1 ' + verification);
                }, 40000);

				if (response.status != 200)
				{	
					alert(response.data);
				} else {
					verification = response.data.randv;
					//alert(response.data.msg);
					alert(response.data.msg);
				}
            });     
        }

        $scope.Confirm = function()
        {
               //alert(verification + ' AZ my code !!');
            if ($scope.vcode.trim() == verification)
            {
                createAccountService.Activate(JSON.stringify(newData))
                .then(function(response) {
                    if (response.status != 200)
                    {
                        alert(response.data);
                    } else {
                        alert(response.data);
                        return $scope.GoBack();
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
            $scope.Clearall();
            $location.path('/');
        }
    }
    });
});
