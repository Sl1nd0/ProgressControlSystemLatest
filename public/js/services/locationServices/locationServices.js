app.service('locationServices', function ($q, $http)
{
	let locationServices = this

	locationServices.postLocation = function (data)
	{
		return $http.get('/API/postLocation' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* locationServices.statusAt */ 
	
	locationServices.getData = function ()
	{
		return $http.get('/API/allData')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* locationServices.statusAt */ 

	locationServices.postOther = function (data)
	{
		return $http.get('/API/postDifferent' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* locationServices.statusAt */ 

	locationServices.leaveLocation = function (data)
	{
		return $http.get('/API/leaveLocation' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* locationServices.statusAt */ 
	
});