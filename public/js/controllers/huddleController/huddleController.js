
app.controller('huddleController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, huddleService) {
   // alert('RONGNESS')
    //getLoggedIN.getLoggedIN(response)
        $http.get('/getLoggedIn').then(function(response) {
        var position = ''; 
        //alert('DEBUG ' + $sessionStorage.displayPosition)
        if ($sessionStorage.displayPosition == undefined)
        {
            $sessionStorage.displayPosition = 100;
        } 
        

       //alert(('Resp ' + response.data.Code)
        if (!response.data.Code)
        {
         //   alert(response.data)
           $location.path('/'); 
        } else if (response.data.Code.trim() == '01') {
           // alert($sessionStorage.displayPosition + ' --->>> as FFF');

            var myData = response.data.Data;
            position = myData.rows[0].workid;
           
            userin.innerHTML = myData.rows[0].username;

            if (position == '1' && $sessionStorage.displayPosition == 100)
            {
                //alert(('Alive !2');
                $scope.htype = "Software Developers ";
            } else if (position == '2' && $sessionStorage.displayPosition == 100)
            {
                $scope.htype = "Consultant ";
            } else if (position == '3' && $sessionStorage.displayPosition == 100)
            {
                $scope.htype = "Support ";
            } else {

                if ($sessionStorage.displayPosition == '1') {
                    $scope.htype = "Software Developers ";
                } else if ($sessionStorage.displayPosition == '2') {
                    $scope.htype = "Consultant ";
                } else if ($sessionStorage.displayPosition == '3') {
                    $scope.htype = "Support ";
                }
            }

            $scope.updateHuddles = function()
            {
                let mydate = new Date();
                
                if ($scope.huddledate != undefined)
                {
                    mydate = $scope.huddledate;
                }

                let upData = {
                    yesterday: $scope.forQuotes($scope.yesterday),
                    today: $scope.forQuotes($scope.today),
                    obstacles: $scope.forQuotes($scope.obstacles),
                    help: $scope.forQuotes($scope.help),
                    id: myData.rows[0].userid,
                    workid: myData.rows[0].workid,
                    huddledate: mydate
                }

               // updateMyHuddles
                huddleService.updateMyHuddles(JSON.stringify(upData))
                .then(function (response)
                {
                    if (response.status != 200)
                    {
                        alert(response.data);
                    } else {
                        alert(response.data.msg); 
                        $scope.updateHuddle = false;
                        $scope.clearAll();
                        return $scope.CheckAll();
                    }
                });
            }

            $scope.removePost = function(val)
            {
                let postData = {
                    huddleid: val,
                    id: myData.rows[0].userid
                }

                let value = confirm("Are you sure you want to remove selected?");
		        //alert(value);
                if (value)
                {
                    huddleService.removeUpdate(JSON.stringify(postData))
                    .then(function (response)
                    {   
                        if (response.status != 200)
                        {
                            alert(response.data);
                        } else {
                            alert(response.data);

                            if ($sessionStorage.displayPosition != 100)
                                {
                                    $scope.categories($sessionStorage.displayPosition);
                                    return $scope.categories($sessionStorage.displayPosition);
                                  
                                } else {
                                    $scope.CheckAll();
                                    return $scope.CheckAll();
                                }
            
                        }
                    });
                }
            }
        
            $scope.forQuotes = function(val)
            {
                let mystr1 = val; 
                while(mystr1.indexOf("'") >= 0)
                {
                    mystr1 = mystr1.replace("'", '<q1>');
                }

                while(mystr1.indexOf('"') >= 0)
                {
                    mystr1 = mystr1.replace('"', '<q2>');
                }
                return mystr1;
            }

            $scope.replaceQuotes = function(val)
            {
                let mystr1 = val;
                while(mystr1.indexOf('<q2>') >= 0)
                {
                    mystr1 = mystr1.replace('<q2>', '"');
                }

                while(mystr1.indexOf('<q1>') >= 0)
                {
                    mystr1 = mystr1.replace('<q1>', "'");
                }
                return mystr1;
            }

            $scope.CheckAll = function()
            {
                
                let mID = {
                    'workid': position
                }
                let mydata = [];
                huddleService.checkAll(JSON.stringify(mID))
                .then(function (response)
                {

                    let Data = response.data.DataH;

                    for (var i = 0; i < Data.rowCount; i++)
                    {
                        let huddleDate = Data.rows[i].huddledate;
                        let empName = Data.rows[i].username;
                        let accomplishY = $scope.replaceQuotes(Data.rows[i].accomplishyesterday);
                        let accomplishT =  $scope.replaceQuotes($scope.sortString(Data.rows[i].accomplishtoday)); //CHANGE
                        let mobstacles = $scope.replaceQuotes(Data.rows[i].obstacles);
                        let needHelp = $scope.replaceQuotes(Data.rows[i].needhelp);
                        let huddleid = Data.rows[i].huddleid;

                        let datestr = huddleDate.toString();
                        datestr = datestr.substring(0,10);
                        let myjson = {
                            Date: datestr,
                            empName: empName,
                            accomplishY: accomplishY,
                            accomplishT: accomplishT,
                            mobstacles: mobstacles,
                            needHelp: needHelp,
                            huddleid: huddleid
                        }

                        mydata.push(myjson);  
                    }
                    $scope.Huddles = mydata;
                });
            }

            $scope.categories = function(mypos)
            {
                
                if ($sessionStorage.displayPosition == '1') {
                    $scope.htype = "Software Developers ";
                } else if ($sessionStorage.displayPosition == '2') {
                    $scope.htype = "Consultant ";
                } else if ($sessionStorage.displayPosition == '3') {
                    $scope.htype = "Support ";
                }

                let mID = {
                    'workid': mypos
                }
                let mydata = [];
                huddleService.checkAll(JSON.stringify(mID))
                .then(function (response)
                {

                    let Data = response.data.DataH;

                    for (var i = 0; i < Data.rowCount; i++)
                    {
                        let huddleDate = Data.rows[i].huddledate;
                        let empName = Data.rows[i].username;
                        let accomplishY = $scope.replaceQuotes(Data.rows[i].accomplishyesterday);
                        let accomplishT =  $scope.replaceQuotes($scope.sortString(Data.rows[i].accomplishtoday)); //CHANGE
                        let mobstacles = $scope.replaceQuotes(Data.rows[i].obstacles);
                        let needHelp = $scope.replaceQuotes(Data.rows[i].needhelp);
                        let huddleid = Data.rows[i].huddleid;

                        let datestr = huddleDate.toString();
                        datestr = datestr.substring(0,10);
                        let myjson = {
                            Date: datestr,
                            empName: empName,
                            accomplishY: accomplishY,
                            accomplishT: accomplishT,
                            mobstacles: mobstacles,
                            needHelp: needHelp,
                            huddleid: huddleid
                        }

                        mydata.push(myjson);  
                    }
                    $scope.Huddles = mydata;
                });
                return;
            }

            $scope.showDev = function()
            {
				$scope.updateHuddle = false;
                $sessionStorage.displayPosition = '1';
                
                $location.path('/huddles');
                return $scope.categories($sessionStorage.displayPosition);
            }

            $scope.showCon = function()
            {
				$scope.updateHuddle = false;
                $sessionStorage.displayPosition = '2';
                //$scope.categories($sessionStorage.displayPosition);
                $location.path('/huddles');
                return $scope.categories($sessionStorage.displayPosition);
            }

            $scope.showSupp = function()
            {
				$scope.updateHuddle = false;
                $sessionStorage.displayPosition = '3';  
                //$scope.categories($sessionStorage.displayPosition);
                $location.path('/huddles');
                  return $scope.categories($sessionStorage.displayPosition);
            }

            $scope.sortString = function(val)
            {
                let newVal = [];
                let stringm = '';
                let count = 0;
                for (var i = 0; i < val.length; i++)
                {   
                    console.log(val[i]);
                                      
                    if (count >= 31 && count < 41 && val[i] == ' ')
                    {
                        //alert('Found 1');
                        newVal[i] = '\n ' + val[i];
                        count = 0;
                    } else if (count >= 41)
                    {
                        //alert('Found 1');
                        newVal[i] = '\n' + val[i];
                        count = 0;
                    } else {
                        newVal[i] = val[i];
                    } 

                    count++; 
                    stringm += newVal[i];
                }
                return stringm;
            }

            $scope.showUpdate = function()
            {
                let messageUpdate = '';
                if ($sessionStorage.displayPosition == '1')
                {
                   // alert('Alive !2');
                    messageUpdate = "Software Developers ";
                    $scope.htype =messageUpdate;
                } else if ($sessionStorage.displayPosition == '2')
                {
                    messageUpdate = "Consultant ";
                    $scope.htype = messageUpdate;
                } else if ($sessionStorage.displayPosition == '3')
                {
                    messageUpdate = "Support ";
                    $scope.htype = messageUpdate;
                }

                if ($sessionStorage.displayPosition != 100 && $sessionStorage.displayPosition != position)
                {   
                    alert('You cannot update huddles for ' + messageUpdate);
                } else {
                //alert('ALYV ');
                $scope.updateHuddle = true;
                $scope.empName1 = myData.rows[0].username;
                }

            }

            $scope.hideUpdate = function()
            {
                $scope.updateHuddle = false;
            }

            $scope.clearAll = function()
            {
                $scope.yesterday = '';
                $scope.today = '';
                $scope.obstacles = '';
                $scope.help = '';
                $sessionStorage.displayPosition = undefined;
            }

            if ($sessionStorage.displayPosition != 100)
            {   
                $scope.categories($sessionStorage.displayPosition);
            } else {
                $scope.CheckAll();
            }
            
            console.log('Succes To HUDDLE!!');
           //$location.path('/'); 
        }

    });
});
