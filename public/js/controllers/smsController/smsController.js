
app.controller('smsController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, sendMessagesService) {
    
        
    $http.get('/getLoggedIn').then(function(response) {
        var position = '';    
	$sessionStorage.displayPosition = undefined;
      // //alert(('Resp ' + response.data.Code)
            if (!response.data.Code)
            {
            //   alert(response.data)
            $location.path('/'); 
            } else if (response.data.Code.trim() == '01') {
                
    $http.get('GetSMSSession').then(function(response) {
        //alert('My SMSz');
        let myData = response.data.Data;
        
        $scope.selected = myData.eNumber;
	$sessionStorage.displayPosition = undefined;
        //alert(myData.eNumber + ' As NUM')
        
        $scope.sendMessage = function()
        {
            alert('Sending sms');
            //    sendMessagesService
            let newData = {
                eName: myData.eName,
                eMail: myData.eMail,
                eNumber: myData.eNumber,
                eLocation: myData.eLocation,
                ePosition: myData.ePosition,
                eMessage: $scope.escapeForJson($scope.escapeQ($scope.message))
            }
            
            sendMessagesService.sendSms(encodeURI(JSON.stringify(newData)))
            .then(function (response)
            {   
                alert(response.data);
            });
        }
		
            $scope.escapeQ = function(val)
            {
                while(val.indexOf('?') >= 0)
                {
                    val = val.replace('?', "<q2>");
                }
            
                return val;
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

        $scope.GoBack = function()
        {
            $location.path('/employees');
        }

    });
  }
});

});
