app.service('leaveServices', function ($q, $http)
{
	let leaveServices = this

    leaveServices.getTotal = function (data)
	{
		return $http.get('/API/daysLeft' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* leaveServices.getTotal */ 
	
	leaveServices.leaveApply = function (data)
	{
		return $http.get('/API/leaveApply' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* leaveServices.leaveApply */ 
	
	leaveServices.getRequest = function ()
	{
		return $http.get('/API/getRequest')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* leaveServices.getRequest */ 
	
	leaveServices.approveLeave = function (data)
	{
		return $http.get('/API/approveLeave' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* leaveServices.getRequest */ 
	
	leaveServices.rejectLeave = function (data)
	{
		return $http.get('/API/rejectLeave' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* leaveServices.getRequest */ 
	
	leaveServices.getTableData = function ()
	{
		return $http.get('/API/GetAllLeaveData')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* leaveServices.getTableData */ 
	
	leaveServices.getManagerMail = function (data)
	{
		return $http.get('/API/getmanMail'+data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* leaveServices.getRequest */ 

	leaveServices.removeLeave = function (data)
	{
		return $http.get('/API/removeFromTable' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* leaveServices.getRequest */ 

});