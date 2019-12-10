app.service('sendMessagesService', function ($q, $http)
{

	let sendMessagesService = this

    sendMessagesService.sendSms = function (data)
	{
		return $http.get('/API/SendSms' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* sendMessagesService.sendSms */ 

    sendMessagesService.sendEmail = function (data)
	{
		return $http.get('/API/SendEmail' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* sendMessagesService.sendEmail */ 
	
	sendMessagesService.sendFile = function (data, jsonData)
	{
		//Special Function
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		//Special Function
		
		return $http.post('/API/SendFile' + jsonData, fd, {
			transformRequest: angular.indentity,
			//Type to be submitted .....
			headers: { 'Content-Type': undefined }
		})
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* sendMessagesService.sendEmail */ 
	
	sendMessagesService.sendEmailNoAttach = function (jsonData)
	{
		//Special Function
		return $http.get('/API/sendNoAttached' + jsonData)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* sendMessagesService.sendEmail */ 
});