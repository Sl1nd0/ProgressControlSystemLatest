app.factory('chatSocket', ['socketFactory', function(socketFactory) {
    return socketFactory();
}]);