
app.controller('createController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, createAccountService) {

    //$scope.password2;

    $scope.CreateAccount = function()
    { 
        let gender = "";
        let validNumber = '';

        //Gender Issues ...
        if ($scope.check1 && $scope.check2 && $scope.check3)
        {
            gender = undefined;
            alert("Select only one gender option")
        } else if ($scope.check1 && $scope.check2) {
            gender = undefined;
            alert("Select only one gender option")
        } else if ($scope.check2 && $scope.check3) {
            gender = undefined;
            alert("Select only one gender option")
        } else if ($scope.check1 && $scope.check3) {
            gender = undefined;
            alert("Select only one gender option")
        } else if ($scope.check1 && gender != undefined) {
            gender = "Male";
        } else if ($scope.check2 && gender != undefined) {
            gender = "Female";
        } else if ($scope.check3 && gender != undefined) {
            gender = "Other";
        }
        //Gender Issues ...

        validNumber = $scope.countrycode + $scope.telnumber;
        //alert(validNumber);
        let position = $scope.position;
        let workid = '';

        if (position.toLowerCase().indexOf('developer') > -1)
        {
            workid = '1';
        } else if (position.toLowerCase().indexOf('consultant') > -1) {
            workid = '2';
        } else if (position.toLowerCase().indexOf('support') > -1) {
            workid = '3';
        } 

        let Data = {
            name: $scope.name,
            surname: $scope.surname,
            birthdate: $scope.birthdate,
            startdate: $scope.startdate,
            idnumber: $scope.idnumber,
            position: $scope.position,
            email: $scope.email,
            telnumber: validNumber,
            gender: gender,
            password: $scope.password,
            workid: workid
        };

        console.log(Data);

            if (!Data.name || !Data.surname || !Data.birthdate || !Data.startdate || !Data.idnumber
                || !Data.position || !Data.email || !Data.telnumber || !Data.gender || !Data.password)
            {
                alert('Please correctly fill in all details');
            } else if ($scope.countrycode != '+27' || $scope.telnumber == undefined) {
                alert('Please fill in the correct phone number');
            } else {
			//alert(workid)
			if (workid == '1' || workid == '2' || workid == '3')
			{
				if ($scope.password2 == $scope.password)
				{
					alert('Please be patient while PCS is validating your details');
					createAccountService.createAccount(JSON.stringify(Data))
					.then(function(response) {

						if (response.status != 200)
						{     
							alert(response.data);
							//$scope.Back();
						} else {
							alert('Account created successfully');
						   // alert(response.data.randv);
							$location.path('/');
							//$scope.Back();
						}
					});
				} else {
					alert("Can't create account: \n\nPassword and confirmation password do not match");
				}
				
			} else {
				alert('The administrator only catered for 3 types of positions for now\n\n WHICH ARE:\n1. Software Developer 2. Support Engineer 3.Consultant');
			}
        }

        //alert('Create Controller Of Mine !!!')
    }

    $scope.Clearall = function()
    {
        $scope.name = '';
        $scope.surname = '';
        $scope.birthdate = '';
        $scope.startdate = '';
        $scope.idnumber = '';
        $scope.position = '';
        $scope.email = '';
        $scope.countrycode = '';
        $scope.telnumber = '';
        $scope.gender = '',
        $scope.password = '';
        return;
    }

    $scope.GoBack = function()
    {
        $scope.Clearall();  
        $location.path('/');
    }

    $scope.getGender = function(val)
    {
        alert(val);
        return val;
    }

    $scope.Back = function()
    {
        alert('BACK Of Mine !!!')
    }

});
