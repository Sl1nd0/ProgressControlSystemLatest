var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//var pool = require('./config/connect2');

var app = express();
var port = process.env.PORT || 4000; 
var http = require('http').Server(app);
global.io = require('socket.io')(http);
var index = require('./routes/index.js'); 
var createAccount = require('./routes/createAccount.js');
var loginAccount = require('./routes/loginRoute.js');
var sendMailRoute =  require('./routes/sendEmailRoute.js');
var sendSmsRoute =  require('./routes/sendSmsRoute.js');
var huddleRouter = require('./routes/huddleRoutes.js');
var leaveR = require('./routes/leaveRoute.js');
var aftaemailr = require('./routes/aftaEmailRoute.js');
var leaveTable = require('./routes/leaveTableRoute.js');
var locationRoute = require('./routes/locationRoute.js');
var siteRoute = require('./routes/siteRouter.js');
var automationRoute = require('./routes/automationRoute.js');
var fileuploadRoute = require('./routes/afterUploadRoute.js');
var multer = require('multer');
//Automation
// var LED1 = new Gpio(4, 'out'); 
//var Gpio = require('onoff').Gpio;

app.use(bodyParser.json())


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(express.static(path.join(__dirname, '//public//static'))) // Serve the public folder.
app.use(express.static(path.join(__dirname, '//public'))) // Serve the public folder.

app.use(express.static(path.join(__dirname, 'views'))) // Serve the views folder.
console.log(path.join(__dirname, 'public'));


//app.use(beginroutes);
app.use(index); // Set the page router
/*
app.use(createAccount);
app.use(loginAccount);

app.use(sendSmsRoute);
app.use(sendMailRoute);
app.use(huddleRouter);
app.use(leaveR);
app.use(aftaemailr); //TEst
app.use(leaveTable);
app.use(locationRoute);
app.use(siteRoute);
app.use(automationRoute);
app.use(fileuploadRoute);
*/
//app.set('port', 4000);
//connection was here

/***********************SOCKET IO SECTION *******************/

/*var i = 0;
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    //Test messages by sending a message every 1 second.
    var i = 0;
    setInterval(function(){

        let hardwareValues = checkHardware();
		//let window1Angle = checkW1Angle();
    	io.emit('hardwarestatus', {
    		hardwareValues
        });

    	i++;
    }, 1000);
});

function checkHardware()
{
    let light1 = 0;
    let light2 = 0;

    if (LED1.readSync() === 1)
    {
        light1 = 1;
    }

    if (LED2.readSync() === 1)
    {
        light2 = 1;
    } 
    let lightData = {
        light1: light1,
        light2: light2 
    }

    return lightData;
}*/

/*
function checkW1Angle()
{
	return req.session.currAngle1; 
}

function checkW2Angle()
{
	return req.session.currAngle2; 
}*/

/***********************SOCKET IO SECTION *******************/

http.listen(port, function() {
    //console.log('Server listening on port ' + server.address().port)
    console.log('Express started on http:// local host:' + 
    port + 'press C-trl C to terminate!');
});

module.exports = app
