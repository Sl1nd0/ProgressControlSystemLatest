
app.controller('emailController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, sendMessagesService) {
    
 $http.get('/getLoggedIn').then(function(response) {
        var position = '';    
	$sessionStorage.displayPosition = undefined;
	
	var userData = response.data.Data;
	
      // //alert(('Resp ' + response.data.Code)
            if (!response.data.Code)
            {
            //   alert(response.data)
            $location.path('/'); 
            } else if (response.data.Code.trim() == '01') {
                
    $http.get('/GetEmailSession').then(function(response) {
        
        $sessionStorage.displayPosition = undefined;

        let myData = response.data.Data;    
        $scope.selected = myData.eMail;

        $scope.customer = {};
        $scope.sendEmail = function()
        {
            //alert('File iz *** ');
            sendMessagesService.sendEmail(encodeURI(JSON.stringify(newData)))
            .then(function (response)
            {
                //alert(myFile.files[0].path + " As PATH");
                alert(response.data)
            });   
        }
            
      //  alert('My MAILS');
      
        $scope.realSender =  function()
        {
			console.log(myData);
            let newData = {
                eName: userData.rows[0].username,
                eMail: myData.eMail,
                fromEmail: myData.myEmail,
                eNumber: myData.eNumber,
                eLocation: myData.eLocation,
                ePosition: myData.ePosition,
                eMessage: $scope.emailText,
                eSubject: $scope.subject
             //   epath: myFile.value
            }

            //$location.path('/employees');
            alert('Please be patient PGS is sending an email to ' + newData.eMail);
            var uploadUrl = 'http://localhost:3000/api/v1/quotes/quoteitem/image/upload';

            let file = $scope.customer;
            let fileContents = file.file;

            if (fileContents != undefined)
            {
                sendMessagesService.sendFile(file, encodeURI(JSON.stringify(newData)))
                .then(function (response)
                {
                   //alert(myFile.files[0].path + " As PATH");
                   if (response.status != 200)
                   {
                        alert(response.data)
                   } else {
                        alert(response.data);
                        $location.path('/employees');
                   }    
                   
                }); 
            } else {
                sendMessagesService.sendEmailNoAttach(encodeURI(JSON.stringify(newData)))
                .then(function (response)
                {
                   //alert(myFile.files[0].path + " As PATH");
                   if (response.status != 200)
                   {
                        alert(response.data)
                   } else {
                        alert(response.data);
                        $location.path('/employees');
                   }    
                   
                }); 
               // alert('You have nothing, IM NOT moving baba!!');
            }
        }
        
        $scope.GoBack = function()
        {
            $location.path('/employees');
        }
    });
    }
});
});

app.directive('fileModel', ['$parse', function($parse){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				})
			})
		}
	}
}])
