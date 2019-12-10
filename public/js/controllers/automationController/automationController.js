
app.controller('automationController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, automationServices, chatSocket) {

    $http.get('/getLoggedIn').then(function(response) {
        
       // $scope.lightStatus = 'LIGHT 1 OFF';
        //$scope.lightStatus2 = 'LIGHT 2 OFF';
		
		//Get the current location
		
        $sessionStorage.displayPosition = undefined;
        if (!response.data.Code)
        {
            $location.path('/'); 
        } else if (response.data.Code.trim() == '01') {
            
            var loginData = response.data.Data;
			var currentLocation = '';
            userin.innerHTML = loginData.rows[0].username;
			
			//alert('My u id ' + loginData.rows[0].userid)
            
            if ($sessionStorage.sms == undefined)
            {
                $sessionStorage.sms = loginData.rows[0].smsautomation;
            }
            
			let userid = {
			userid : loginData.rows[0].userid
			}
			// loginData.rows[0].smsautomation
			$scope.activateSms = function()
			{
				alert('No controller connected, this is only for demonstration purposes');
				/* No raspberry PI
				let userdata = {
					userid: loginData.rows[0].userid,
					number: loginData.rows[0].usernumber
				}
				
				let encodeData = encodeURI(JSON.stringify(userdata));
				
				if (loginData.rows[0].smsautomation != 'ACTIVE' && $sessionStorage.sms == 'DEACTIVE')
				{
                    
                    //alert('*' + loginData.rows[0].smsautomation.trim() + '*');
					automationServices.activateSmsAutomation(encodeData)
					.then(function(response) {
					   //currentLocation = response.data.locationStatus;
					   if (response.status != 200)
					   {
						alert(response.data);
					   } else {
                           $sessionStorage.sms = 'ACTIVE';
						   alert(response.data);
						  $scope.smsautomation = $sessionStorage.sms;;
					   }
					   $location.path('/hardware');
					});	
				} else {
					alert('Number already active for sms automation');
				}
				*/
			}
			
			/*
			automationServices.getCurrentlocation(encodeURI(JSON.stringify(userid)))
                .then(function(response) {
                   currentLocation = response.data.locationStatus;
				   alert(' ** ' + response.data + ' ** ');
				   alert('My location ' + currentLocation);
				   
			}); */
			
            //console.log(response.data.Data.rows[0].username + "======= "  + response.data.Data.rows[0].userid);
            //alert('HARDWARE MAN!!!');
            
          //  $sessionStorage.displayPosition = undefined;
            $scope.openWindow = function(val)
            {
				alert('No controller connected, this is only for demonstration purposes');
             //   setTimeout(function() {},1000); // Open them after 2 seconds
			 
				/* No Raspberry, therefore it won't work
			   if (currentLocation == 1)
				{
                automationServices.openWindow(val)
                .then(function(response) {
                    let window = response.data;
                    return;
                    alert(response.data);
                });
				} else {
					alert("You cannot control office because you're not at the office");
				}
				  */
            }

            $scope.closeWindow = function(val)
            {
				alert('No controller connected, this is only for demonstration purposes');
                //setTimeout(function() {},1000); // close them after 2 seconds
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1)
				{
                automationServices.closeWindow(val)
                .then(function(response) {
                    let window = response.data;
                    return;
                   // alert();
                });    
				} else {
					alert("You cannot control office because you're not at the office");
				}
				*/
            }
            
            $scope.offLight1 = function(var1)
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1) 
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
				} else {
					alert("You cannot control office because you're not at the office");
				}
				*/
            }
            
            $scope.onLight1 = function(var1)
            {
				alert('No controller connected, this is only for demonstration purposes');
               
			   /* No Raspberry, therefore it won't work
                if (currentLocation == 1)
                {
                alert('Light 1 ON');
                automationServices.turnOn(var1)
                .then(function(response) {
                    let lightStatus = response.data;
                    
                    //alert(response.data)
                    if (lightStatus == '1 ON')
                    {
                        //alert('Shesha ON');
                        $scope.lightStatus = 'LIGHT ' + lightStatus;
                       // return $scope.checkOutputStatus();
                    }
                });
				} else {
					alert("You cannot control office because you're not at the office");
				}
				*/
            }

              
            $scope.onLight2 = function(var2)
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
                if (currentLocation == 1)
                {
                alert('Light 2 ON');
                automationServices.turnOn(var2)
                .then(function(response) {
                    let lightStatus2 = response.data;
                    
                    //alert(response.data)
                    if (lightStatus2 == '2 ON')
                    {
                       // alert('Shesha ON');
                        $scope.lightStatus2 = 'LIGHT 2 ' + lightStatus2;
                        //return $scope.checkOutputStatus();
                    }
                });
				} else {
					alert("You cannot control office because you're not at the office");
				}
				*/
            }

            $scope.offLight2 = function(var2)
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
                if (currentLocation == 1)
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
				} else {
					alert("You cannot control office because you're not at the office");
				}
				*/
            }
            
            $scope.onLight3 = function(var2)
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1)
				{
                alert('Light 3 ON');
                automationServices.turnOn(var2)
                .then(function(response) {
                    let lightStatus3 = response.data;
                    
                    //alert(response.data)
                    if (lightStatus3 == '3 ON')
                    {
                        //alert('Shesha ON');
                        $scope.lightStatus3 = 'LIGHT 3 ' + lightStatus3;
                        //return $scope.checkOutputStatus();
                    }
                });
				} else {
						alert("You cannot control office because you're not at the office");
				}
				*/
            }
            
            $scope.offLight3 = function(var2)
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1)
				{
                alert('Light 3 OFF');
                automationServices.turnOFF(var2)
                .then(function(response) {
                    let lightStatus3 = response.data;

                    if (lightStatus3 == 'OFF')
                    {
                        //alert('Shesha');
                        $scope.lightStatus3 = 'LIGHT 3 ' + lightStatus3;
                        //return $scope.checkOutputStatus();
                    }

                   // alert();
                });
				} else {
					alert("You cannot control office because you're not at the office");
				}
				*/
            }
          
            $scope.openDoor = function()
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1)
				{
                 automationServices.openDoor()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                }); 
				} else {
					alert("You cannot control office because you're not at the office");
				}
				*/
            }
            
            $scope.closeDoor = function()
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1)
				{
                automationServices.closeDoor()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });  
				} else {
					alert("You cannot control office because you're not at the office");
				}
				*/
            }

            $scope.openAll = function()
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1)
				{
                automationServices.openAll()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });  
				} else {
					alert("You cannot control office because you're not at the office");
				}				
				*/
            }

            $scope.closeAll = function()
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1)
				{
                automationServices.closeAll()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });  
				} else {
					alert("You cannot control office because you're not at the office");
				}
				*/
            }

            $scope.onAlarm = function()
            {   
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1)
				{
                automationServices.onAlarm()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });  
				} else {
					alert("You cannot control office because you're not at the office");
				}	
				*/				
            }

            $scope.offAlarm = function()
            {
				alert('No controller connected, this is only for demonstration purposes');
				/* No Raspberry, therefore it won't work
				if (currentLocation == 1)
				{
                automationServices.offAlarm()
                .then(function(response) {
                    let door = response.data;
                    return;
                   // alert();
                });  
				} else {
					alert("You cannot control office because you're not at the office");
				}		
				*/		
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
                   	$scope.smsautomation = $sessionStorage.sms;
                });
            
                chatSocket.on('hardwarev', function(data) {
                    //alert(data.hardwareValues.light1 + ' AS TEST');
                    if (data.hardwareValues.doorAngle != undefined && data.hardwareValues.doorAngle >= 105)
                    {
                       // alert(data.hardwareValues.doorAngle)
                        $scope.doorStatus = 'Open';
                    } else {
                       // console.log(data.hardwareValues.doorAngle + ' AS angle');
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
                    
					if (data.hardwareValues.windowAngle3 != undefined)
                    {
                        
                        $scope.windowStatus3 = data.hardwareValues.windowAngle3 + ' deg Open';
                    } else {
                        $scope.windowStatus3 = '0 deg Open';
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
                   	$scope.smsautomation = $sessionStorage.sms;

                });
       
				chatSocket.on('smsautomation', function(data) { 
				
                    //alert(data.hardwareValues.light1 + ' AS TEST');
                    if (data.hardwareValues.doorAngle != undefined && data.hardwareValues.doorAngle >= 105)
                    {
                       // alert(data.hardwareValues.doorAngle)
                        $scope.doorStatus = 'Open';
                    } else {
                        //console.log(data.hardwareValues.doorAngle + ' AS angle');
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
                    
					if (data.hardwareValues.windowAngle3 != undefined)
                    {
                        
                        $scope.windowStatus3 = data.hardwareValues.windowAngle3 + ' deg Open';
                    } else {
                        $scope.windowStatus3 = '0 deg Open';
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
                   	$scope.smsautomation = $sessionStorage.sms;

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
