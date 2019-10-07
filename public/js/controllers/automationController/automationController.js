
app.controller('automationController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, automationServices, chatSocket) {

    $http.get('/getLoggedIn').then(function(response) {
        
       // $scope.lightStatus = 'LIGHT 1 OFF';
        //$scope.lightStatus2 = 'LIGHT 2 OFF';

        $sessionStorage.displayPosition = undefined;
        if (!response.data.Code)
        {
            $location.path('/'); 
        } else if (response.data.Code.trim() == '01') {
            var loginData = response.data.Data;
            userin.innerHTML = loginData.rows[0].username;
            //console.log(response.data.Data.rows[0].username + "======= "  + response.data.Data.rows[0].userid);
            //alert('HARDWARE MAN!!!');
            
          //  $sessionStorage.displayPosition = undefined;
            $scope.openWindow = function(val)
            {
             //   setTimeout(function() {},1000); // Open them after 2 seconds
                automationServices.openWindow(val)
                .then(function(response) {
                    let window = response.data;
                    return;
                   // alert();
                });
            }

            $scope.closeWindow = function(val)
            {
                //setTimeout(function() {},1000); // close them after 2 seconds
                automationServices.closeWindow(val)
                .then(function(response) {
                    let window = response.data;
                    return;
                   // alert();
                });    
            }
            
            $scope.offLight1 = function(var1)
            {
                alert('Light 1 OFF');
                automationServices.turnOFF(var1)
                .then(function(response) {
                    let lightStatus = response.data;

                    if (lightStatus == 'OFF')
                    {
                        //alert('Shesha');
                        $scope.lightStatus = 'LIGHT 1 ' + lightStatus;
                        //return $scope.checkOutputStatus();
                    }

                   // alert();
                });
            }
            
            $scope.onLight1 = function(var1)
            {
                alert('Light 1 ON');
                automationServices.turnOn(var1)
                .then(function(response) {
                    let lightStatus = response.data;
                    
                    //alert(response.data)
                    if (lightStatus == '1 ON')
                    {
                        //alert('Shesha ON');
                        $scope.lightStatus = 'LIGHT 1 ' + lightStatus;
                       // return $scope.checkOutputStatus();
                    }
                });
            }

              
            $scope.onLight2 = function(var2)
            {
                alert('Light 2 ON');
                automationServices.turnOn(var2)
                .then(function(response) {
                    let lightStatus2 = response.data;
                    
                    //alert(response.data)
                    if (lightStatus2 == '2 ON')
                    {
                        alert('Shesha ON');
                        $scope.lightStatus2 = 'LIGHT 2 ' + lightStatus2;
                        //return $scope.checkOutputStatus();
                    }
                });
            }

            $scope.offLight2 = function(var2)
            {
                alert('Light 2 OFF');
                automationServices.turnOFF(var2)
                .then(function(response) {
                    let lightStatus2 = response.data;

                    if (lightStatus2 == 'OFF')
                    {
                        //alert('Shesha');
                        $scope.lightStatus2 = 'LIGHT 2 ' + lightStatus2;
                        //return $scope.checkOutputStatus();
                    }

                   // alert();
                });
            }
            
            $scope.onLight3 = function(var2)
            {
                alert('Light 3 ON');
                automationServices.turnOn(var2)
                .then(function(response) {
                    let lightStatus3 = response.data;
                    
                    //alert(response.data)
                    if (lightStatus3 == '3 ON')
                    {
                        //alert('Shesha ON');
                        $scope.lightStatus3 = 'LIGHT 2 ' + lightStatus3;
                        //return $scope.checkOutputStatus();
                    }
                });
            }
            
            $scope.offLight3 = function(var2)
            {
                alert('Light 3 OFF');
                automationServices.turnOFF(var2)
                .then(function(response) {
                    let lightStatus3 = response.data;

                    if (lightStatus3 == 'OFF')
                    {
                        //alert('Shesha');
                        $scope.lightStatus3 = 'LIGHT 2 ' + lightStatus3;
                        //return $scope.checkOutputStatus();
                    }

                   // alert();
                });
            }
          
            $scope.openDoor = function()
            {
                 automationServices.openDoor()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                }); 
            }
            
            $scope.closeDoor = function()
            {
                automationServices.closeDoor()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });  
            }

            $scope.openAll = function()
            {
                automationServices.openAll()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });     
            }

            $scope.closeAll = function()
            {
                automationServices.closeAll()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });     
            }

            $scope.onAlarm = function()
            {   
                automationServices.onAlarm()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });    
            }

            $scope.offAlarm = function()
            {
                automationServices.offAlarm()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });    
            }
                //CHECK OUTPUT STATUS
                chatSocket.on('hardwarestatus', function(data) {
                    if (data.hardwareValues.light2 != undefined)
                    {   
                     //  alert(data.hardwareValues.light2);
                    }
                    
                    //$scope.messages.push(data.message.toString());
                   if (data.hardwareValues.light2 == 1)
                   {
                       // alert('yyyy');
                        $scope.lightStatus2 = 'LIGHT 2 ON';  
                   } else {
                        $scope.lightStatus2 = 'LIGHT 2 OFF'; 
                   }

                   if (data.hardwareValues.light1 == 1)
                   {
                        $scope.lightStatus = 'LIGHT 1 ON';  
                   } else {
                        $scope.lightStatus = 'LIGHT 1 OFF'; 
                   }  
                });
            
                chatSocket.on('hardwarev', function(data) {
                    //alert(data.hardwareValues.light1 + ' AS TEST');
                    if (data.hardwareValues.doorAngle != undefined && data.hardwareValues.doorAngle >= 135)
                    {
                       // alert(data.hardwareValues.doorAngle)
                        $scope.doorStatus = 'Open';
                    } else {
                        console.log(data.hardwareValues.doorAngle + ' AS angle');
                        $scope.doorStatus = 'Closed';
                    }
                    
                    if (data.hardwareValues.windowAngle1 != undefined)
                    {
                        //alert(data.hardwareValues.windowAngle2);
                        $scope.windowStatus1 = data.hardwareValues.windowAngle1 + ' deg Open';
                    } else {
                        $scope.windowStatus1 = '0 deg Open';
                    }
                    
                    if (data.hardwareValues.windowAngle2 != undefined)
                    {
                        
                        $scope.windowStatus2 = data.hardwareValues.windowAngle2 + ' deg Open';
                    } else {
                        $scope.windowStatus2 = '0 deg Open';
                    }
                    
                    if (data.hardwareValues.light2 == 1)
                   {
                       // alert('yyyy');
                        $scope.lightStatus2 = 'LIGHT 2 ON';  
                   } else {
                        $scope.lightStatus2 = 'LIGHT 2 OFF'; 
                   }

                   if (data.hardwareValues.light1 == 1)
                   {
                        $scope.lightStatus = 'LIGHT 1 ON';  
                   } else {
                        $scope.lightStatus = 'LIGHT 1 OFF'; 
                   }  

                   if (data.hardwareValues.light3 == 1)
                   {
                        $scope.lightStatus3 = 'LIGHT 3 ON';  
                   } else {
                        $scope.lightStatus3 = 'LIGHT 3 OFF'; 
                   }

                });
       
       
                chatSocket.on('alarm', function(data) { 
                    //console.log('TXT-TXTTT');
                    if (data.alarmstate == 0)
                    {
                        $scope.alarmStatus = 'Not Active'
                    } else if (data.alarmstate == 1)
                    {
                        
                         if (data.alarmvalue == 1)
                        {
                           //alert('NNNNNNN')
                            $scope.alarmStatus = 'Break in, WARNING!!!';   
                        } else 
                        {
                            $scope.alarmStatus = 'Active';
                        }
                    } 
                 
                });
            //$scope.checkOutputStatus();

        }
    });
});
