
app.controller('siteController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, siteServices) {
  // alert('RONGNESS')
     //getLoggedIN.getLoggedIN(response)
  $sessionStorage.displayPosition = undefined;
  
         $http.get('/getLoggedIn').then(function(response) {
            if (!response.data.Code)
            {
                $location.path('/'); 
            } else if (response.data.Code.trim() == '01') {
                //alert('On SITE Controller');
                var myData = response.data.Data;
                //Codes here
                userin.innerHTML = myData.rows[0].username;

                $scope.addSite = function()
                {
                  //  let dec = parseInt($scope.color.toString().substring(0, $scope.color.toString().length),16);
                    //alert(dec + ' AS MY DCC')
                    let data = {
                        sitename: $scope.sitename,
                        red:  $scope.hexToRgb($scope.color).r,
                        green: $scope.hexToRgb($scope.color).g,
                        blue: $scope.hexToRgb($scope.color).b
                    }

                    //alert(dec);
                   // alert( $scope.hexToRgb($scope.color).r + ' ' + $scope.hexToRgb($scope.color).g  + ' ' + $scope.hexToRgb($scope.color).g + ' AS HEX ');
                    let encoded = encodeURI(JSON.stringify(data));

                    if (myData.rows[0].useremail.toUpperCase().trim() == 'SSANKABI@GMAIL.COM')
                    {
						siteServices.addSite(encoded)
						.then(function(response) {
						//After response man!
							alert(response.data);
							$location.path('/location');

						});
                    } else {
                      alert('You do not have privileges of adding site, please speak to the pcs owner');
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
                      return mval;
                  }

                  $scope.goBack = function()
                  {   
                     // sessionData = undefined;
                      $location.path('/employees');
                  }

                  $scope.hexToRgb = function(hex) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                    } : null;
                  }

            }
        });

    });
