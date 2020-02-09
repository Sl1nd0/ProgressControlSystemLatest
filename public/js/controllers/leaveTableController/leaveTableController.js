
app.controller('leaveTableController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, leaveServices) {

    //alert('Leave Table in Control now');
        $http.get('/getLoggedIn').then(function(response) {
        if (!response.data.Code)
        {
            $location.path('/'); 
        } else if (response.data.Code.trim() == '01') {
            var loginData = response.data.Data;
            userin.innerHTML = loginData.rows[0].username;
            //alert ( 'TEST ')
                $scope.checkAll = function()
                {
                        leaveServices.getTableData()
                        .then(function(response) {

                        let Data = response.data;
                        let mydata = [];
                        for (var i = 0; i < Data.rowCount; i++)
                        {  /*
                            <td> {{leave.startDate}} </td> 
                        <td> {{leave.endDate}} </td> 
                        <td> {{leave.empName}} </td>
                        <td> {{leave.empSur}} </td>
                        <td> {{leave.empEmail}} </td>
                        <td> {{leave.empType}} </td>
                        <td> {{leave.leaveDays}} </td> 
                        */

                            let startdate = $scope.fixDate(Data.rows[i].startdate);
                            let enddate = $scope.fixDate(Data.rows[i].enddate);
                            let empName = Data.rows[i].username;
                            let empSur = Data.rows[i].usersurname;
                            let empEmail =  Data.rows[i].useremail; //CHANGE
                            let managerEmail =  Data.rows[i].manageremail; 
                            let empType = Data.rows[i].leavetype; 
                            let leaveDays = Data.rows[i].leavedays;
                            let leaveid = Data.rows[i].leaveid;
                            let leavestatus = Data.rows[i].leavestatus;
                            //alert(Data.rows[i].startdate)   
                                
                            let myjson = {
                                startdate: startdate,
                                enddate: enddate,
                                empName: empName,
                                empSur: empSur,
                                empEmail: empEmail.toLowerCase(), //CHANGE
                                managerEmail: managerEmail.toLowerCase(),
                                empType: empType,
                                leaveDays: leaveDays,
                                leaveid: leaveid,
                                leaveStatus: leavestatus
                            }

                            mydata.push(myjson);  
                        }
                        $scope.Leaves = mydata;
                    });
                }

                $scope.removeLeave = function(val)
                {
					let value = confirm("Are you sure you want to remove selected leave info?");
					
					if (value) {
						let myId = {
							id: val,
							email: loginData.rows[0].useremail
						}
					 //alert(' My ID ' + myId.id)
						leaveServices.removeLeave(JSON.stringify(myId))
						.then(function(response) {
							//    alert('Ayoba Africa!')
							if (response.status != 200)
							{
								alert(response.data);
							} else {
								alert(response.data);
								$location.path('/leavetable')
							   return $scope.checkAll();
							}
						});
					} else {
						return $scope.checkAll();
					}
                }

                $scope.checkAll();

                $scope.fixDate = function(datem)
                {
                    let datestr = datem.toString();
                    datestr = datem.substring(0,10);
                    return datestr;
                }
        }
    });
 });
        
