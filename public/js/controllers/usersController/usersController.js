
app.controller('usersController', function ($scope, $route, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, usersService, chatSocket) {
    
    $http.get('/getLoggedIn').then(function(response) {

        if (!response.data.Code)
        {
         //   alert(response.data)
           $location.path('/'); 
        } else if (response.data.Code.trim() == '01') {

        $scope.messages = [];
    
    // getLoggedIn
//alert('Alive and well --- 222 !!!')
    var data1 = response.data.Data;
    var datafromsocket = '';
    var newlocation = [];

    userin.innerHTML = data1.rows[0].username; 
        //console.log(Data.rows[0].username + ' \n\n****' + Data.rows[0].usernumber);
        //Socket

        let mydata = [];
        var Data = ''; 
        usersService.getAll(data1)
        .then(function (response)
        {
          $sessionStorage.displayPosition = undefined;
            
            Data = response.data.Data1;
            let locations = response.data.locations;

            for (var i = 0; i < Data.rowCount; i++)
            {
                let name = Data.rows[i].username;
                let mail = Data.rows[i].useremail;
                let number = Data.rows[i].usernumber;
                let location = locations[i]; //CHANGE
                let position = Data.rows[i].userposition;
                let pass = Data.rows[i].userpassword;

                let myjson = {
                    eName: name,
                    eMail: mail,
                    eNumber: number,
                    eLocation: location,
                    ePosition: position,
                    ePassword: pass
                }

                    mydata.push(myjson);  
            }
            $scope.Employees = mydata;
            //return $scope.setAfterReturn;
        });

        $scope.sendEmail = function(val)
        {
            let newData = {
                eMail: val.eMail,
                myEmail: data1.rows[0].useremail
               // ePass: val.ePassword
                //message: $scope.message
            }
            
            if (newData.eMail != data1.rows[0].useremail)
            {
                usersService.SetemailSession(encodeURI(JSON.stringify(newData)))
                .then(function (response)
                {
                    $location.path('/sendemail');
                });
            } else {
                alert("You can't send an email to yourself");
                return;
            }
        }

        $scope.sendSms = function(val)
        {
            //let myNumber = val.eNumber;
            let newData = {
                eName: val.eName,
                eMail: val.eMail,
                eNumber: val.eNumber,
                eLocation: val.eLocation,
                ePosition: val.ePosition
            }

            if (newData.eMail != data1.rows[0].useremail)
            {
            usersService.SetSmsSession(JSON.stringify(newData))
            .then(function (response)
            {
                $location.path('/sendsms')
            });
            }  else {
                alert("You can't send an sms to yourself");
                return;
            }  
        }

        $scope.setAfterReturn = function(val, locs)
        {
           //$route.reload();;
            let Data = val;
            let datax = [];

            if (mydata.length != 0)
            {
                mydata = datax;
            }
            
            for (var i = 0; i < Data.rowCount; i++)
            {
                let name = Data.rows[i].username;
                let mail = Data.rows[i].useremail;
                let number = Data.rows[i].usernumber;
                let location = locs[i]; //CHANGE
                let position = Data.rows[i].userposition;
                let pass = Data.rows[i].userpassword;

                let myjson = {
                    eName: name,
                    eMail: mail,
                    eNumber: number,
                    eLocation: location,
                    ePosition: position,
                    ePassword: pass
                }
                    //console.log(location);
                    mydata.push(myjson);  
            }
            
            $scope.Employees = mydata;
            return;
        }

        chatSocket.on('getallusers', function(data) {
            
          if ($sessionStorage.locs == undefined)
          {
            $sessionStorage.locs = data.location;
          }

            if (data.alldata != undefined)
            {
                //alert(data.locations[0]);
                datafromsocket = data.alldata;
                
                //$scope.setLocationData();
            }
            //console.log(data.alldata + ' az my data \n');
            //console.log(data.location + ' az my location \n');

            if (data.location != undefined)
            {
                //console.log(data.location[0])
               newlocation = data.location;
                 //alert( data.location[0])
                 
            }

            let myloc = data.location ;
            for (var i = 0; i < data.location.length; i++)
            {
               // console.log($sessionStorage.locs[i] + '  == ----- ==  ' + data.location[i] + '\n');
               if ($sessionStorage.locs[i] != data.location[i]) {
                  //alert('Changes'); //SOMETHING CHANGED ..
                  $scope.setAfterReturn(datafromsocket, newlocation);
                   $sessionStorage.locs = data.location;
                 }
            }
               // $scope.setAfterReturn(datafromsocket, newlocation); //Rememeber to uncomment
            
           // mylocations
        }); 
        }
    });
    
});