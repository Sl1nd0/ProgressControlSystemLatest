app.service('automationServices', function ($q, $http)
{

	let automationServices = this

    automationServices.turnOn = function (data)
	{
		return $http.get('/API/turnOn' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.loginAccount*/  

	automationServices.turnOFF = function (data)
	{
		return $http.get('/API/turnOff' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.loginAccount */

	automationServices.openWindow = function (data)
	{
		return $http.get('/API/openWindow' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.openWindow */

	//'/API/closeWindow'
	automationServices.closeWindow = function (data)
	{
		return $http.get('/API/closeWindow' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.closeWindow */
	
	automationServices.openDoor = function ()
	{
		return $http.get('/API/openDoor')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.openDoor */
	
	automationServices.closeDoor = function ()
	{
		return $http.get('/API/closeDoor')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.closeDoor */


	automationServices.onAlarm = function ()
	{
		return $http.get('/API/onAlarm')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.onAlarm */
	
	automationServices.offAlarm = function ()
	{
		return $http.get('/API/offAlarm')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.offAlarm */
	
	automationServices.openAll = function ()
	{
		return $http.get('/API/openAll')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.openAll */

	automationServices.closeAll = function ()
	{
		return $http.get('/API/closeAll')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* automationServices.closeAll */
	
});
