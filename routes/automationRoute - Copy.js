var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var pool = require('../config/connect');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var twilio = require('twilio');
var client = new twilio('AC38c360080cfddb271554c355c83f542d', 'b6ee2e5869d7ac3268dbdbbabfb54ab7');
var accStatus = 0;
var nodemailer = require('nodemailer');
var session = require('express-session');
//var piblaster = require('pi-servo-blaster.js');
//var piblaster2 = require('pi-servo-blaster.js');
var stateA = 0;
// var Gpio = require('onoff').Gpio;
// var LED1 = new Gpio(13, 'out'); 
// var LED2 = new Gpio(19, 'out');
// var nvcc1 = new Gpio(20, 'out');
// var nvcc2 = new Gpio(21, 'out');
// var LED3 = new Gpio(26, 'out');
// var sensor = new Gpio(6, 'out');
var messagesent = 0;

var lightState1 = undefined;
var lightState2 = undefined;
var lightState3 = undefined;

// nvcc1.writeSync(1);
// nvcc2.writeSync(1);

// if (lightState1 == undefined)
// {
// 	LED1.writeSync(1);
// }

// if (lightState2 == undefined)
// {
// 	LED1.writeSync(1);
// }

// if (lightState3 == undefined)
// {
// 	LED1.writeSync(1);
// }

var Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: 'd22c162a',
	apiSecret: 'Ev5RQke8YMLdosu6',
});  

var alarmvalue = 0;
var alarm = 0;
//var sent = 0; 
var window1 = 0;
var window2 = 0;
var door1 = 0;

var doorAngle = undefined;
var windowAngle1 = undefined;
var windowAngle2 = undefined;
var myData = '';

router.use(session({ secret: '12teqwgds687t97fsersfgk', cookie: { maxAge: 600000 }}))
// LED1.writeSync(1);
// LED2.writeSync(1);
// LED3.writeSync(1);


router.get('/API/turnOn:ToDo', function(req, res) {

	if (req.params.ToDo)
	{
		let lightNum = req.params.ToDo;
		if (lightNum == '1')
		{
			lightState1 = 1;

			console.log('ON');
			// LED1.writeSync(0);
			
			return res.status(200).send('1 ON');
		} else if (lightNum == '2')
		{
			lightState2 = 1;
			console.log('ON');
			// LED2.writeSync(0);
			
			return res.status(200).send('2 ON');
			
		} else if (lightNum == '3')
		{
			lightState3 = 1;
			console.log('ON');
			// LED3.writeSync(0);
			
			return res.status(200).send('3 ON');
			
		}
	} else {
		return res.status(400).send('Something went wrong while attempting to switch on light');
	}
});

router.get('/API/turnOff:ToDo', function(req, res) {

	if (req.params.ToDo)
	{
		let lightNum = req.params.ToDo;
		if (lightNum == '1')
		{
			console.log('OFF');
			//LED1.writeSync(1);
			return res.status(200).send('1 OFF');
		} else if (lightNum == '2')
		{
			console.log('OFF');
			//LED2.writeSync(1);
			return res.status(200).send('2 OFF');
		}  else if (lightNum == '3')
		{
			console.log('OFF');
			//LED3.writeSync(1);
			return res.status(200).send('3 OFF');
		}

	} else {
		return res.status(400).send('Something went wrong while attempting to switch off light');
	}
});

router.get('/API/openWindow:ToDo', function(req, res) {

	if (req.params.ToDo)
	{
		let windowNum = req.params.ToDo;
		if (windowNum == '1')
		{
			//Window angles starting from 45 to 180 Degrees
			if (!req.session.currAngle)
			{
				req.session.currAngle = 0;
			}

			if (window1 > 0)
			{
				req.session.currAngle = window1;
			}
			// closeWindow(windowNum, req, res);
			if (req.session.currAngle == 0 || req.session.currAngle == 45)
			{	
				//console.log('NOT OPEN AT ALL ' + req.session.currAngle1);
				//openAT90(windowNum, req, res);
				return res.status(200).send('Result');
			} else if (req.session.currAngle == 90) {
				//open135AT(windowNum, req, res);
				return res.status(200).send('Result');
			} else if (req.session.currAngle == 135) {
				//open180AT(windowNum, req, res);
			} else {
				return res.status(200).send("Window " + windowNum + " 180 degrees open!");
			}
			//Window angles starting from 45 to 180 Degrees

		} else if (windowNum == '2')
		{	
			if (!req.session.currAngle2)
			{
				req.session.currAngle2 = 0;
			}

			if (window1 > 0)
			{
				req.session.currAngle2 = window2;
			}
			
			if (req.session.currAngle2 == 0 || req.session.currAngle2 == 45)
			{	
				//console.log('NOT OPEN AT ALL ' + req.session.currAngle1);
				console.log(' WINDOW NUMBER ' + windowNum);
				return res.status(200).send('Result');
				//openAT90_2(windowNum, req, res);
			} else if (req.session.currAngle2 == 90) {
				//open135AT_2(windowNum, req, res);
				return res.status(200).send('Result');
				//return res.status(200).send('Something went wrong while attempting to open window');
			} else if (req.session.currAngle2 == 135) {
				//open180AT_2(windowNum, req, res);
				return res.status(200).send('Result');
			} else {
				return res.status(200).send("Window " + windowNum + " 180 degrees open!");
			}
		}

	} else {
		return res.status(400).send('Something went wrong while attempting to open window');
	}
});

router.get('/API/closeWindow:ToDo', function(req, res) {
    
	if (req.params.ToDo)
	{
		if (!req.session.currAngle)
		{
			req.session.currAngle = 0;
		}
			
		console.log(' WINDOWZ  ==>> ' + window1);
		let windowNumber = req.params.ToDo;

		if (windowNumber == '1')
		{
			if (req.session.currAngle > 45 || window1 > 45)
			{
				//closeWindow(windowNumber, req, res);
				return res.status(200).send('Result');
			} else {
				return res.status(200).send('Something went wrong while attempting to open window');
			}
		} else if (windowNumber == '2')
		{
			if (!req.session.currAngle2)
			{
				req.session.currAngle2 = 0;
			}
		
			if (req.session.currAngle2 > 45 || window2 > 45)
			{
				//closeWindow(windowNumber, req, res);
				return res.status(200).send('Result');
			} else {
				return res.status(200).send('Something went wrong while attempting to open window');
			}
		} 
		
	} else {
		return res.status(400).send('Something went wrong while attempting to open window');
	}
});


router.get('/API/onAlarm', function(req, res) {
    
    if (req.session.alarm != undefined)
    {
		alarm = req.session.alarm;
	}
	
	if (alarm == 0)
	{
		alarm = 1;
		console.log('====    -> Onned      ');
		req.session.alarm = alarm;
		return res.status(200).send('Alarm on');
	} else {
		console.log('====    -> Onned      2 ');
		return res.status(200).send('Alarm is already on');
	}
});

router.get('/API/offAlarm', function(req, res) {
    
    if (req.session.alarm != undefined)
    {
		alarm = req.session.alarm;
	}
	messagesent = 0;
	alarm = 0;
	alarmvalue = 0;
	stateA = 0;
	
	if (alarm == 1)
	{
		alarm = 0;
		console.log('======      -> Offed       ');
		return res.status(200).send('Alarm off');
	} else {
		console.log('======      -> Offed       2 ');
		return res.status(200).send('Alarm is already off');
	}
});

function checkAlarm()
{
	 return alarm;
}

function openAT90(val, req, res)
{
	let curAngle = 45;
	let direction = 1;
	let sent1 = 0;
	let delay = 10;
	
	if (window1 != 0)
	{
		req.session.currAngle = window1;
	}

	if (req.session.currAngle != 0 && req.session.currAngle != undefined)
	{
		curAngle = req.session.currAngle;
	}

	if (req.session.currAngle == 90)
	{ 
		console.log(' IT Goes in here, it ESCAPES')
		window1 = req.session.currAngle;
		curAngle = 90;
		windowAngle1 = curAngle  - 45;
		return res.status(200).send({angle: curAngle, angleMessage: '45 deg open'});
	} else if (val == '1' && req.session.currAngle <= 45)
	{
		let refreshId = setInterval(() => {
			//console.log('Session for angle 1 ' + req.session.currAngle1 + ' 2 ' + req.session.currAngle2 + '  ' + req.session.currAngle3);
			console.log('AT START')
			piblaster.setServoPwm("P1-12", angleToPercent(curAngle) + "%");
		
			curAngle += direction;
			req.session.closed = 0;

			// Change direction when it exceeds the max angle.
			if (curAngle >= 90 && curAngle < 135) {
				req.session.currAngle = 90;
				window1 = req.session.currAngle;
				windowAngle1 = req.session.currAngle  - 45;
				direction = 0;
				clearInterval(refreshId);	//Clear the interval
			} else if (curAngle <= 45) {
				direction = 0;
			}
		
			//sent = 1;
			if (curAngle == 90 && sent1 == 0)
			{	
				sent1 = 1;
				return res.status(200).send('Window 1 45 deg open');
			}
			}, 10);
	}	
}


function openAT90_2(val, req, res)
{
	let curAngle = 45;
	let direction = 1;
	let sent1 = 0;
	let delay = 10;
	
	if (window2 != 0)
	{
		req.session.currAngle2 = window2;
	}

	if (req.session.currAngle2 != 0 && req.session.currAngle2 != undefined)
	{
		curAngle = req.session.currAngle2;
	}

	if (req.session.currAngle2 == 90)
	{ 
		window2 = req.session.currAngle2;
		curAngle = 90;
		windowAngle2 = curAngle  - 45;
		return res.status(200).send({angle: curAngle, angleMessage: '45 deg open'});
	} else if (val == '2' && req.session.currAngle2 <= 45)
	{
		let refreshId = setInterval(() => {
			//console.log('Session for angle 1 ' + req.session.currAngle1 + ' 2 ' + req.session.currAngle2 + '  ' + req.session.currAngle3);
			console.log('AT START')
			piblaster.setServoPwm("P1-16", angleToPercent(curAngle) + "%");
		
			curAngle += direction;
			//req.session.closed = 0;

			// Change direction when it exceeds the max angle.
			if (curAngle >= 90 && curAngle < 135) {
				req.session.currAngle2 = 90;
				window2 = req.session.currAngle2;
				windowAngle2 = req.session.currAngle2  - 45;
				direction = 0;
				clearInterval(refreshId);	//Clear the interval
			} else if (curAngle <= 45) {
				direction = 0;
			}
		
			//sent = 1;
			if (curAngle == 90 && sent1 == 0)
			{	
				sent1 = 1;
				return res.status(200).send('Window 2 45 deg open');
			}
			
			}, 10);
	}	
}

function open180AT(val, req, res)
{
	let curAngle = 135;
	let direction = 1;
	let sent = 0;
	
	if (req.session.currAngle == 180)
	{ 
		window1 = req.session.currAngle;
		curAngle = 180;
		windowAngle1 = curAngle  - 45;
		sent = 1;
		return res.status(200).send('Window 1 180 deg open');
	}
	
	if (val == '1')
	{
		let refreshId = setInterval(() => {
		
			console.log('AT START')
			piblaster.setServoPwm("P1-12", angleToPercent(curAngle) + "%");

			curAngle += direction;
			
			// Change direction when it exceeds the max angle.
			if (curAngle >= 180) {
				req.session.currAngle = 180;
				window1 = req.session.currAngle;
				windowAngle1 = req.session.currAngle  - 45;
				direction = 0;
				clearInterval(refreshId);	
			} else if (curAngle <= 135) {
				direction = 0;
			}
		
			//sent = 1;
			if (curAngle == 180 && sent == 0)
			{	
				sent = 1;
				return res.status(200).send('Window 1 180 deg open');
			}
			
			}, 10);
		}
}


function open180AT_2(val, req, res)
{
	let curAngle = 135;
	let direction = 1;
	let sent = 0;
	
	if (req.session.currAngle2 == 180)
	{ 
		window2 = req.session.currAngle2;
		curAngle = 180;
		windowAngle2 = curAngle  - 45;
		sent = 1;
		return res.status(200).send('Window 2 180 deg open');
	}
	
	if (val == '2')
	{
		let refreshId = setInterval(() => {
		
			console.log('AT START')
			piblaster.setServoPwm("P1-16", angleToPercent(curAngle) + "%");

			curAngle += direction;
			
			// Change direction when it exceeds the max angle.
			if (curAngle >= 180) {
				req.session.currAngle2 = 180;
				window2 = req.session.currAngle2;
				windowAngle2 = req.session.currAngle2  - 45;
				direction = 0;
				clearInterval(refreshId);	
			} else if (curAngle <= 135) {
				direction = 0;
			}
		
			//sent = 1;
			if (curAngle == 180 && sent == 0)
			{	
				sent = 1;
				return res.status(200).send('Window 2 180 deg open');
			}
			
			}, 10);
		}
}

function open135AT(val, req, res)
{
	let curAngle = 90;
	let direction = 1;
	let sent = 0;
		
	if (req.session.currAngle == 135)
	{ 
		window1 = req.session.currAngle;
		curAngle = 135;
		windowAngle1 = curAngle  - 45;
		sent = 1;
		return res.status(200).send('Window 1 135 deg open');
	}
	
	if (val == '1')
	{
		let refreshId = setInterval(() => {
			//console.log('Session for angle 1 ' + req.session.currAngle1 + ' 2 ' + req.session.currAngle2 + '  ' + req.session.currAngle3);
			console.log('AT START')
			piblaster.setServoPwm("P1-12", angleToPercent(curAngle) + "%");
		
			curAngle += direction;
	
			// Change direction when it exceeds the max angle.
			if (curAngle >= 135 && curAngle < 180) {
				req.session.currAngle = 135;
				window1 = req.session.currAngle;
				windowAngle1 = req.session.currAngle  - 45;
				direction = 0;
				clearInterval(refreshId);	
			} else if (curAngle <= 90) {
				direction = 0;
			}
		
			if (curAngle == 135 && sent == 0)
			{	
				sent = 1;
				return res.status(200).send('Window 1 135 deg open');
			}	
		}, 10);
		}
}


function open135AT_2(val, req, res)
{
	let curAngle = 90;
	let direction = 1;
	let sent = 0;
		
	if (req.session.currAngle2 == 135)
	{ 
		window2 = req.session.currAngle2;
		curAngle = 135;
		windowAngle2 = curAngle  - 45;
		sent = 1;
		return res.status(200).send('Window 2 135 deg open');
	}
	
	if (val == '2')
	{
		let refreshId = setInterval(() => {
			//console.log('Session for angle 1 ' + req.session.currAngle1 + ' 2 ' + req.session.currAngle2 + '  ' + req.session.currAngle3);
			console.log('AT START')
			piblaster.setServoPwm("P1-16", angleToPercent(curAngle) + "%");
		
			if (curAngle < 135)
			{
			curAngle += direction;
			}
	
			// Change direction when it exceeds the max angle.
			if (curAngle >= 135 && curAngle < 180) {
				req.session.currAngle2 = 135;
				window2 = req.session.currAngle2;
				windowAngle2 = req.session.currAngle2 - 45;
				direction = 0;
				clearInterval(refreshId);	
			} else if (curAngle <= 90) {
				direction = 0;
			}
		
			if (curAngle == 135 && sent == 0)
			{	
				sent = 1;
				return res.status(200).send('Window 2 135 deg open');
			}	
		}, 10);
		}
}

function closeWindow(val, req, res)
{

    if (val == '1')
	{
			
		let direction = 1; 
		let curAngle = req.session.currAngle;
		let closed = 0;
		let delay = 10;
			
		if (!req.session.currAngle)
		{
			curAngle = 45;
		}

		if (window1 > 0)
		{
			curAngle = window1;
		}

		let id = setInterval(() => {
				
				piblaster2.setServoPwm("P1-12", angleToPercent(curAngle) + "%");
				
				if (curAngle > 45)
				{
					curAngle -= direction;
				}
			
				// Change direction when it exceeds the max angle.
				if (curAngle <= 45) {
					req.session.currAngle = 45;
					window1 = req.session.currAngle;
					windowAngle1 = 0;
					delay = 1;
					direction = 0;
					clearInterval(id);
				} 
					
					if (curAngle <= 45 && closed == 0)
					{
						console.log('IN CLOSING');
						//NGYAYIVALA LANA
						closed = 1;
						//NGYAYIVALA LANA
						console.log('AT END')
						return res.status(200).send('Window 1 closed');
					} 
				}, 10);
	} else if (val == '2')
	{
		let direction = 1; 
		let curAngle = req.session.currAngle2;
		let closed = 0;
		let delay = 10;
			
		if (!req.session.currAngle2)
		{
			curAngle = 45;
		}

		if (window2 > 0)
		{
			curAngle = window2;
		}

		let id = setInterval(() => {
				
				piblaster2.setServoPwm("P1-16", angleToPercent(curAngle) + "%");
				
				if (curAngle > 45)
				{
					curAngle -= direction;
				}
			
				// Change direction when it exceeds the max angle.
				if (curAngle <= 45) {
					req.session.currAngle2 = 45;
					window2 = req.session.currAngle2;
					windowAngle2 = 0;
					delay = 1;
					direction = 0;
					clearInterval(id);
				} 
					
					if (curAngle <= 45 && closed == 0)
					{
						console.log('IN CLOSING');
						//NGYAYIVALA LANA
						closed = 1;
						//NGYAYIVALA LANA
						console.log('AT END')
						return res.status(200).send('Window 2 closed');
					} 
				}, 10);
	}
}

//'/API/closeDoor'
router.get('/API/openDoor', function(req, res) {
	console.log('Hello DOOR OPEN');
	if (!req.session.doorAngle)
	{
		req.session.doorAngle = 0;
	}

	if (req.session.doorAngle == 0 || req.session.doorAngle == 45)
	{	console.log('Test If i go in');
		openDoor(req, res);
	} else {
		console.log('Hello DOOR OPEN ');
		return res.status(200).send('Door is open');
	}
});

router.get('/API/closeDoor', function(req, res) {
	console.log('Hello DOOR CLOSE');
	if (req.session.doorAngle > 45 || door1 > 45)
	{
		console.log('Hello col UUU');
		closeDoor(req, res);
	} else {
		return res.status(400).send('Door is closed');
	}
});

router.get('/API/openAll', function(req, res) {
	
	if (window1 == 45 || window1 == 0 || window2 == 45 || window2 == 0 || door1 == 45 || door1 == 0)
	{
		//openAll(req, res);
		return res.status(200).send('All open');	
	} else {
		return res.status(200).send('All open');
	}
	
});

router.get('/API/closeAll', function(req, res) {

	let val = 0;
	console.log(window1 + ' * ' +  window2 +  ' * ' + door1);

	if (window1 > 45 || window2 > 45 || door1 > 45)
	{
		//closeAll(req, res);
		return res.status(200).send('All open');
	} else {
		return res.status(200).send('All open');
	}
	//closeWindowAll(req, res);
});

/*********************************FUNCTIONS  *************************************************/

function openAll(req, res)
{

	let curAngleW1 = 45;
	let curAngleW2 = 45;
		let direction = 1;
		let sent1 = 0;
		let closed = 0;
		let delay = 10;
	let dAngle = 45;

	if (window1 != 0)
	{
		curAngleW1 = window1;
	}
	
	if (window2 != 0)
	{
		curAngleW2 = window2;
	}

	if (door1 != 0)
	{
		dAngle = door1;
	}

	if (window1 <= 90)
	{

		let refreshId = setInterval(() => {
			curAngleW1 += direction;
			//req.session.currAngle = curAngleW1;

			if (curAngleW1 >= 90)
			{
				
				window1 = 90;
				windowAngle1 = window1 - 45;
				//w1 = 45;
				//console.log(req.session.currAngle + ' AS 1');
				clearInterval(refreshId);
			}

			piblaster.setServoPwm("P1-12", angleToPercent(curAngleW1) + "%");
		});
	} 

	if (window2 <= 90)
	{
	
		let refreshId2 = setInterval(() => {
			curAngleW2 += direction;
			//req.session.currAngle2 = curAngleW2;

			if (curAngleW2 >= 90)
			{
				window2 = 90;
				windowAngle2 = window2 - 45;
				//w2 = 45;
				//console.log(req.session.currAngle2 + ' AS 2');
				clearInterval(refreshId2);
			}

			piblaster.setServoPwm("P1-16", angleToPercent(curAngleW2) + "%");
		});
	}
	
	if (door1 <= 135)
	{

		let refreshId3 = setInterval(() => {
			dAngle += direction;
			//req.session.currAngle = curAngleW1;

			if (dAngle >= 135)
			{
				
				//door1 = doorAngle;
				door1 = 135;
				doorAngle = door1;
				//console.log(req.session.doorAngle + ' AS 1');
				clearInterval(refreshId3);
			}

			piblaster.setServoPwm("P1-18", angleToPercent(dAngle) + "%");
		});
	}

	if (window2 > 45 || window1 > 45 || door1 > 90)
	{
		return res.status(200).send('Halaju');
	} else {
		return res.status(200).send('Halaju');
	}
}

function closeAll(req, res)
{
		
	let curAngleW1 = 45;
	let curAngleW2 = 45;
	let direction = 1;
	let direction2 = 1;
	let direction3 = 1;
	let sent1 = 0;
	let closed1 = 0;
	let closed2 = 0;
	let closed3 = 0;
	let delay = 10;
	let dAngle = 45;
	let comp1 = 0
	let comp2 = 0;
	let comp3 = 0;

	if (window1 != 0)
	{
		curAngleW1 = window1;
	}
	
	if (window2 != 0)
	{
		curAngleW2 = window2;
	}

	if (door1 != 0)
	{
		dAngle = door1;
	}

	let id1 = setInterval(() => {
		
		piblaster2.setServoPwm("P1-12", angleToPercent(curAngleW1) + "%");
		
		if (curAngleW1 > 45)
		{
			curAngleW1 -= direction;
		}
	
		// Change direction when it exceeds the max angle.
		if (curAngleW1 <= 45) {
			req.session.currAngle = 45;
			window1 = req.session.currAngle;
			windowAngle1 = 0;
			delay = 1;
			direction = 0;

			piblaster2.setServoPwm("P1-16", angleToPercent(curAngleW2) + "%");
				
				if (curAngleW2 > 45)
				{
					curAngleW2 -= direction2;
				}
			
				// Change direction when it exceeds the max angle.
				if (curAngleW2 <= 45) {
					req.session.currAngle2 = 45;
					window2 = req.session.currAngle2;
					windowAngle2 = 0;
					direction2 = 0;
					//clearInterval(id1);

					piblaster.setServoPwm("P1-18", angleToPercent(dAngle) + "%");
			
			if (dAngle > 45)
			{
				dAngle -= direction3;
			}
		
			// Change direction when it exceeds the max angle.
			if (dAngle <= 45) {
				req.session.doorAngle = 45;
				door1 = req.session.doorAngle;
				doorAngle = req.session.doorAngle;
				//delay = 1;
				direction3 = 0;
				clearInterval(id1);
			} 
				
				if (dAngle <= 45 && closed3 == 0)
				{
					console.log('IN CLOSING');
					//NGYAYIVALA LANA
					closed3 = 1;
					//NGYAYIVALA LANA
					console.log('AT END')
					//return res.status(200).send({angle: curAngle, angleMessage: '45 deg open'});
				}

				} 
					
					if (curAngleW2 <= 45 && closed2 == 0)
					{
						console.log('IN CLOSING');
						//NGYAYIVALA LANA
						window1 = 0;
						closed2 = 1;
						//NGYAYIVALA LANA
						console.log('AT END');
						//return res.status(200).send('Window 2 closed');
					}
		} 
			
			if (curAngleW1 <= 45 && closed1 == 0)
			{
				console.log('IN CLOSING');
				//window1 = 0;
				//NGYAYIVALA LANA
				closed1 = 1;
				//NGYAYIVALA LANA
				console.log('AT END');
				//return res.status(200).send('Window 1 closed');
			} 
		});

		if (window1 == 45 && window2 == 45 && door1 == 45)
		{
			if (closed1 == 1 && closed2 == 1 && closed3 == 1)
			{
				return res.status(200).send('Window 2 closed');
			}	
		} else if (window1 == 45 && window2 != 45  && door1 != 45)
		{
			if (closed1 == 1)
			{
				return res.status(200).send('Window 2 closed');
			}	
		} else if (window1 != 45 && door1 != 45 && window2 == 45)
		{
			if (closed2 == 1)
			{
				return res.status(200).send('Window 2 closed');
			}	
		} else if (window1 != 45 && door1 == 45 && window2 != 45)
		{
			if (closed3 == 1)
			{
				return res.status(200).send('Window 2 closed');
			}	
		} else {
			return res.status(200).send('Window 2 closed');
		}
}

function openDoor(req, res)
{
	
	let curAngle = 45;
	let direction = 1;
	let sent1 = 0;
	let delay = 10;
	
	if (req.session.doorAngle == 135)
	{ 
		door1 = req.session.doorAngle;
		curAngle = 135;
		doorAngle = curAngle;
		console.log('Test 1');
		return res.status(200).send({angle: curAngle, angleMessage: '45 deg open'});
	} else if (req.session.doorAngle <= 45)
	{
		console.log('Test 2');
		let refreshId = setInterval(() => {
			//console.log('Session for angle 1 ' + req.session.currAngle1 + ' 2 ' + req.session.currAngle2 + '  ' + req.session.currAngle3);
			console.log('AT START')
			piblaster.setServoPwm("P1-18", angleToPercent(curAngle) + "%");
		
			curAngle += direction;
			//req.session.closed = 0;

			// Change direction when it exceeds the max angle.
			if (curAngle >= 135 && curAngle < 180) {
				req.session.doorAngle = 135;
				door1 = req.session.doorAngle;
				doorAngle = req.session.doorAngle;
				console.log(' MY SESSION ' + req.session.doorAngle);
				direction = 0;
				clearInterval(refreshId);	//Clear the interval
			} else if (curAngle <= 45) {
				direction = 0;
			}
		
			//sent = 1;
			if (curAngle == 135 && sent1 == 0)
			{	
					//let window1Angle = checkW1Angle();
				sent1 = 1;
				return res.status(200).send({angle: curAngle, angleMessage: '45 deg open'});
			}
			
			}, 10);
	}
}

function closeDoor(req, res)
{
	let direction = 1; 
	let curAngle = req.session.doorAngle;
	let closed = 0;
	let delay = 10;

	if (!req.session.doorAngle)
	{
		curAngle = 45;
	}

	if (door1 > 0)
	{
		curAngle = door1;
	}

	if (curAngle != undefined && curAngle > 45)
	 {
		let id = setInterval(() => {
				
				piblaster.setServoPwm("P1-18", angleToPercent(curAngle) + "%");
				
				if (curAngle > 45)
				{
					curAngle -= direction;
				}
			
				// Change direction when it exceeds the max angle.
				if (curAngle <= 45) {
					req.session.doorAngle = 45;
					door1 = req.session.doorAngle;
					doorAngle = req.session.doorAngle;
					delay = 1;
					direction = 0;
					clearInterval(id);
				} 
					
					if (curAngle <= 45 && closed == 0)
					{
						console.log('IN CLOSING');
						//NGYAYIVALA LANA
						closed = 1;
						//NGYAYIVALA LANA
						console.log('AT END')
						return res.status(200).send({angle: curAngle, angleMessage: '45 deg open'});
					} 
				}, 10);
	}
}

//Test SENDING DATA WITH GLOBAL WEBSOCKETS SO THAT DETAILS OF MOTOR POSITIONS MAY BE EASILY KNOWS TO ALL WHO LOG IN TO SITE
	global.io.on('connection', function(socket){
   // console.log('a user connected');
    //socket.on('disconnect', function(){
    //  console.log('user disconnected');
    //});
    //Test messages by sending a message every 1 second.
	console.log(' I In naaH?');
    var i = 0;
    setInterval(function(){

        let hardwareValues = checkHardware();
		//let window1Angle = checkW1Angle();
    	global.io.emit('hardwarev', {
    		hardwareValues
        });
        
		// if (sensor.readSync() === 1 && alarm == 1)
		// {	
		// 	stateA = 1;		
		// }

		if (stateA == 1)
		{
			console.log('Dont mess me up')
			//alarmvalue = checkAlarm();
			  if (alarmvalue == 1 && messagesent == 0)
			  {
				  
				  console.log('I am no 2')
				  
				  let getNumbers = "SELECT * FROM progressaccount LIMIT(80)";
				  pool.query(
					  getNumbers, (err6, qres6) => {
					  if (err6)
					  {
						  console.log('Subtracting annual problem');
						  console.log(err6);
						  //return res.status(400).send("Couldn't subtract annual leave");
					  } else {
						  sendData(qres6);
						  console.log('IM DONED');
						  //return res.status(200).send("Leave Approved for " + updateData.employeename);
					  }
				  });
				  //Send sms to everyone
				  /*nexmo.message.sendSms(
					  'Nexmo',  myData.eNumber, msg,
						  (err, responseData) => {
						  if (err) {
							  console.log(err1);
							  return res.status(200).send('Something went wrong');
						  } else {
							  console.log(' SMS SENT as well ');		   
							 return res.status(200).send('Message Sent');  
						  }
				  });*/
  
			  } else if (alarmvalue == 0)
			  {
				  console.log('I am no 1')
			  }
		}
		
         global.io.emit('alarm', {
			 'alarmvalue': alarmvalue,
			 'alarmstate': alarm
         });

    	i++;
    }, 1000);
});
//Test SENDING DATA WITH GLOBAL WEBSOCKETS SO THAT DETAILS OF MOTOR POSITIONS MAY BE EASILY KNOWS TO ALL WHO LOG IN TO SITE

function sendData(Data)
{	
	
	let j = 0;
	console.log('Im flippin sending stuff')
	while (j < Data.rowCount)
	{
		console.log('Inside of SENDER')
		sendSMS(Data.rows[j].usernumber);
		j++;
	}
	messagesent = 1;
	stateA = 0;
	return;
}

function sendSMS(number)
{
	var msg = "EMERGENCY!!!!!!! \n\nSomeone is trying to break into the office!!!!";
	nexmo.message.sendSms(
		'Nexmo', number, msg,
			(err, responseData) => {
			if (err) {
				//return res.status(400).send("Couldn't resend verification code");
			} else {
				console.log(' SMS SENT as well ');
				return;
				//accStatus = 1;	
				//req.session.views = Data;	
				//console.log('My verify is ' + randval);
				//return res.status(200).send({msg: 'Account confirmed successfully' , randv: randval});
				//return res.status(200).send("Leave Approved for " + Data.employeename);  
			}
	});
}

function checkHardware()
{
   /* let light1 = 0;
    let light2 = 0;
	let light3 = 0;

    if (LED1.readSync() === 0)
    {
        light1 = 1;
    }

    if (LED2.readSync() === 0)
    {
        light2 = 1;
    } 
	
	if (LED3.readSync() === 0)
    {
        light3 = 1;
    } 
    */
	
    let lightData = {
        light1: 1,
		light2: 1,
		light3: 1,
        doorAngle: 45,
        windowAngle1: 45,
        windowAngle2: 45
    }
    //console.log(lightData.windowAngle2 + ' AS my stuffs *** ');
    return lightData;
}

function angleToPercent(angle) {

	return Math.floor((angle/180) * 100);  
}

module.exports = router; 
