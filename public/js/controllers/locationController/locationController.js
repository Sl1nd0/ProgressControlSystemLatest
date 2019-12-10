
app.controller('locationController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, locationServices, siteServices, chatSocket) {
    
    $http.get('/getLoggedIn').then(function(response) {
        var position = '';    
	$sessionStorage.displayPosition = undefined;
      // //alert(('Resp ' + response.data.Code)
            if (!response.data.Code)
            {
            //   alert(response.data)
            $location.path('/'); 
            } else if (response.data.Code.trim() == '01') {
                
                var myData = response.data.Data;
                userin.innerHTML = myData.rows[0].username;

                $scope.checkSites = function()
                {
                    siteServices.getSiteData()
                    .then(function (response)
                    { 
                        $scope.setSiteData(response.data)
                    });
                    return;
                }

                $scope.setSiteData = function(value)
                {

                    let Data2 = value;
                    let mydata = [];
                    let mydata2 = [];
                   // alert(Data.rowCount + ' AS Cwnt')
                    for (var i = 0; i < Data2.rowCount; i++)
                    {
                       
                        let red =  Data2.rows[i].red;
                        let green =  Data2.rows[i].green;
                        let blue =  Data2.rows[i].blue;

                        let sitename = Data2.rows[i].sitename;
                      //  alert(green + " " + blue)
                        //let sitecolor = 
                        //locationdate.setHours(locationdate.getHours + 2);
                       // alert(username );
                        //Come back and fix the date!!!!
                      
                        let myjson = {
                           // locationdate: locationdate,
                            sitename: sitename,
                            sitecolor: $scope.rgbToHex(parseInt(red), parseInt(green), parseInt(blue))
                        }
                        
                        let myjson2 = {
                            "background-color" : $scope.rgbToHex(parseInt(red), parseInt(green), parseInt(blue))
                        }

                      //  alert( $scope.rgbToHex(Data2.rows[i].sitecolor) + '   AS TST')

                       

                        console.log(myjson);

                       
                        mydata.push(myjson);  
                        mydata2.push(myjson2);
                    }
                   // $scope.Huddles = mydata;
                    $scope.sites = mydata;
                    $scope.
                   // $scope.myObj = mydata2;
                    return;
                    //$scope.getLocation(response.data);
                   // return $location.path('/location');
                }

                    $scope.rgbToHex = function(r, g, b) {
                        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);        
                    }

              /*  $scope.myObj = {
    
                    "background-color" : "coral",
                   
                  }*/

               /* $scope.Kawar2 = function(value) {
                    return { 'background-color': 'Red' };
                 }*/
                chatSocket.on('alldata', function(data) {
                //    /console.log(data)
                   $scope.setLocationData(data.alldata);
                });

                $scope.getAllLocationData = function()
                {
                    $scope.checkSites();   
                    locationServices.getData()
                    .then(function (response)
                    {   
                        //Return somewhere
                        if (response.status != 200) {
                            alert(response.data);
                            
                        } else {
                            $scope.setLocationData(response.data);
                          //  alert('My LOVE ERR');
                           // $location.path('/location');

                        }
                        
                    });
                }

                $scope.setLocationData = function(value)
                {
                    
                    let Data = value;
                    let mydata = [];
                   // alert(Data.rowCount + ' AS Cwnt')
                    for (var i = 0; i < Data.rowCount; i++)
                    {
                        let username =  Data.rows[i].username;
                        let usersurname =  Data.rows[i].usersurname;
                        let site = Data.rows[i].sitename;
                        let locmessage = Data.rows[i].locationmessage;
                        let locationdate = Data.rows[i].locationdate;
                        //locationdate.setHours(locationdate.getHours + 2);
                       // alert(username );
                        //Come back and fix the date!!!!
                      
                        let datestr = locationdate.toString();
                        //FIX
                        datestr = datestr.substring(0,16).replace('T', ' ');
    
                        let myjson = {
                           // locationdate: locationdate,
                            locmessage: locmessage,
                            site: site,
                            usersurname: usersurname,
                            username: username,
                            locationdate: datestr
                        }
    
                        mydata.push(myjson);  
                    }
                   // $scope.Huddles = mydata;
                    $scope.locations = mydata;
                    //$scope.getLocation(response.data);
                   // return $location.path('/location');
                }

                $scope.postLocation = function(value)
                {
                    let data = {
                        sitename: value,
                        userid: myData.rows[0].userid
                    }
                    
                    locationServices.postLocation(JSON.stringify(data))
                    .then(function(response) {
                        if (response.status != 200)
                        {
                            alert(response.data);
                        } else {
                            alert(response.data);
                            return $scope.getAllLocationData();
                        }
                        
                    });

                }

                $scope.postLocationLeave = function(value)
                {
                    let data = {
                        sitename: value,
                        userid: myData.rows[0].userid
                    }
                    
                    locationServices.leaveLocation(JSON.stringify(data))
                    .then(function(response) {
                        if (response.status != 200)
                        {
                            alert(response.data);
                        } else {
                            alert(response.data);
                            return $scope.getAllLocationData();
                        }
                        
                    });
                }

                $scope.postLocationOther = function(value)
                {
                    let data = {
                        message: $scope.escapeForJson(value),
                        userid: myData.rows[0].userid
                    }

                    locationServices.postOther(encodeURI(JSON.stringify(data)))
                    .then(function(response) {
                        if (response.status != 200)
                        {
                            alert(response.data);
                        } else {
                            alert(response.data);
                            return $scope.getAllLocationData();
                        }
                    });

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
                      return mval;
                  }

                  $scope.getAllLocationData();

        }
    });
});
