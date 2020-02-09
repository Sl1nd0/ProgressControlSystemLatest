
app.controller('leaveController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, leaveServices) {
    // alert('RONGNESS')
     //getLoggedIN.getLoggedIN(response)
         $http.get('/getLoggedIn').then(function(response) {
            $sessionStorage.displayPosition = undefined;
			//console.log(response.data.Data);
			
			var userData = response.data.Data;
			
            if (!response.data.Code)
            {
                $location.path('/'); 
            } else if (response.data.Code.trim() == '01') {
                var formData = response.data.Data;
               
                //Code beginning
                var sessionData = undefined;
                let data = response.data.Data;
                console.log( data.rows[0].usernumber);
                var qData = {
                    useremail: data.rows[0].useremail,
                    usernumber: data.rows[0].usernumber
                }
                console.log(qData.useremail)
                
                    $scope.start = function()
                    {
                       
                     //   alert();
                        //alert($scope.checkSession().employeename + ' AZ TEST IN START * ');
                       //alert('Hello w');
                       //alert(sessionData.employeename + ' AS Session CHECK');
                      //  alert(sessionData.employeename + ' AZ my NAME'); 

                        if (sessionData)
                        {
                            $scope.revertBack();
                        } else {
                            $scope.name = formData.rows[0].username;
                            $scope.lastname = formData.rows[0].usersurname;
                            $scope.email = formData.rows[0].useremail;
                            $scope.countrycode = formData.rows[0].usernumber.substring(0,3);
                            $scope.telnumber = formData.rows[0].usernumber.substring(3,9+3);
    
                        }

                        leaveServices.getTotal(JSON.stringify(qData))
                        .then(function(response) {
                            let leavedata = response.data;
                            $scope.numberS = leavedata.rows[0].sickleave;
                            $scope.numberA = leavedata.rows[0].annualleave;
                        });
                    }

                    $scope.goBack = function()
                    {   
                        sessionData = undefined;
                        $location.path('/employees');
                    }

                    $scope.revertBack = function()
                    {
                        $scope.name = sessionData.employeename;
                        $scope.lastname  = sessionData.lastname;
                        $scope.email  = sessionData.email;
                       // phone:
                        $scope.countrycode = sessionData.countrycode;
                        $scope.telnumber = sessionData.telnumber;
                        $scope.managername = sessionData.managername;
                        $scope.manageremail  = sessionData.manageremail;
                        $scope.datestart  =  new Date(sessionData.datestart);
                        $scope.dateend  =  new Date(sessionData.dateend);
                        $scope.leavetype  = sessionData.leavetype;
                        $scope.leavemessage  = sessionData.leavemessage;
                    }

                    $scope.checkSession = function()
                    { 
                        $http.get('/leaveSession').then(function(response1) {
                            if (response1.data.leave == '00')
                            {
                                return $scope.start();
                            } else {
                              //  alert(response1.data.leave + ' FRM session');
                               // alert(response1.data.Data.employeename + ' AZ TEST');
                               // console.log(response1.data.Data);
								if (response1.data.Data.employeename != userData.rows[0].username) {
									return $scope.start();	
								} else {
                                sessionData = response1.data.Data;
                                return $scope.start();
								}
                            }
                        });
                    }

                    $scope.setSession = function(val)
                    {
                        let doneData = val;
                        return doneData;
                    }

                    $scope.applyLeave = function()
                    {
                      
                      if ($scope.countrycode != '+27') 
                      {
                          alert('Enter a valid number')
                      } else {
                          let phone = $scope.countrycode + $scope.telnumber;
                          //alert($scope.leavetype);
                         /* name
                        lastname
                        manageremail
                        countrycode
                        telnumber
                        managername
                        manageremail
                        datestart
                        dateend
                        leavetype
                        leavemessage */
                        if (!$scope.name || !$scope.lastname || !$scope.manageremail || !$scope.countrycode || !$scope.telnumber 
                        || !$scope.managername || !$scope.manageremail || !$scope.datestart || !$scope.dateend || !$scope.leavetype
                        || !$scope.leavemessage)
                        {
                            alert('Please fill in all leave request details')
                        } else {

                        let requestdata = {
                            employeename: $scope.name, //22
                            lastname: $scope.lastname, //33
                            email: $scope.email, //11
                            usernumber: phone, //44
                            managername: $scope.managername,   //1
                            manageremail: $scope.manageremail, //2
                            countrycode:  $scope.countrycode,
                            telnumber: $scope.telnumber,
                            datestart: $scope.datestart,
                            dateend: $scope.dateend,
                            leavetype: $scope.leavetype,
                            leavemessage: $scope.escapeForJson($scope.leavemessage)
                        } 
                       

                        console.log(requestdata.leavemessage  + ' AZ message ');
                        leaveServices.leaveApply(encodeURI(JSON.stringify(requestdata)))
                        .then(function(response) {
                            alert(response.data);
							sessionData = undefined;
                        });
                        
                        }  
                      }
                    }
                    
                    $scope.escapeForJson = function(value) {
                        var mval = value;

                          mval.replace(/\b/g, "")
                          mval.replace(/\f/g, "")
                          mval.replace(/\\/g, "\\")
                          mval.replace(/\"/g, "\\\"")
                          mval.replace(/\t/g, "\\t")
                          mval.replace(/\r/g, "\\r")
                          mval.replace(/\n/g, "\\n")
                          mval.replace(/\u2028/g, "\\u2028")
                          mval.replace(/\u2029/g, "\\u2029");
                          mval.replace('"', '\"');
                          mval.replace('"', '\"');
                          return mval
                      }

                //alert('Begin');
               // $scope.localStuff();
                $scope.checkSession();
            }
        });
});
        
