
app.controller('leaveApproveController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, leaveServices) {
    ///alert('Leave in Control now');
    
    $sessionStorage.displayPosition = undefined;
    var myData = '';
    leaveServices.getRequest()
    .then(function(response) {
        //alert(('Success');
        $scope.start(response.data.Data);
        //Setting data I'll use for updating
        myData = response.data.Data;

    });

    $scope.leaveApprove = function()
    {
        /*let requestdata = {
        employeename: $scope.name, //22
        lastname: $scope.lastname, //33
        email: $scope.email, //11
        usernumber: phone, //44
        managername: $scope.managername,   //1
        manageremail: $scope.manageremail, //2

        datestart: $scope.datestart,
        dateend: $scope.dateend,
        leavetype: $scope.leavetype,
        leavemessage: $scope.leavemessage
        } */

        //Data used for updating
        let encodeData = encodeURI(JSON.stringify(myData));

        leaveServices.approveLeave(encodeData)
        .then(function(response) {  
            if (response.status != 200)
            {
                alert(response.data);
            } else {
                alert(response.data);
                $scope.clearAll();
                return $location.path('/');
            }
            //alert('Test Approve DD');

        });
    }

    $scope.leaveReject = function()
    {
        let encodeData2 = encodeURI(JSON.stringify(myData));

        leaveServices.rejectLeave(encodeData2)
        .then(function(response) {  
            if (response.status != 200)
            {
                alert(response.data);
            } else {
                alert(response.data);
                $scope.clearAll();
                return $location.path('/');
            }
            //alert('Test Approve DD');

        });
    }

    $scope.clearAll = function()
    {
        $scope.requesterName = '';
        $scope.leaveNote = '';
    }   

    $scope.start = function(val)
    {
        $scope.requesterName = val.employeename;
        $scope.leaveNote = val.leavemessage
    }
   
 });
        
