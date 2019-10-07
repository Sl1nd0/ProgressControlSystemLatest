app.service('siteServices', function ($q, $http)
{
	let siteServices = this

	siteServices.addSite = function (data)
	{
		return $http.get('/API/addSite' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* siteServices.addSite */ 
	
	siteServices.getSiteData = function ()
	{
		return $http.get('/API/allSiteData')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* siteServices.getSiteData */ 
	
});