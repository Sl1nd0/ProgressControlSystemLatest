app.service('huddleService', function ($q, $http)
{

	let huddleService = this

    huddleService.checkPos = function (data)
	{
		return $http.get('/API/CheckPosition' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* huddleService.checkPos */ 

    huddleService.checkAll = function (data)
	{
		return $http.get('/API/CheckAll' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* huddleService.checkAll */ 

    huddleService.updateMyHuddles = function (data)
	{
		return $http.get('/API/updateHuddles' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* huddleService.checkPos */ 
	
	huddleService.removeUpdate = function (data)
	{
		return $http.get('/API/removeUpdate' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* huddleService.removeUpdate */ 

});