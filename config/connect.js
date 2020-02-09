/*const pg = require('pg');

let queryCheck = "";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
 });

pool.connect(function(err, res) {
    if (err) {
        throw err;
    } else {
        console.log(' Successfully Connected to Database');
    }
}); //2578398_1

/*
queryCheck = "UPDATE progressaccount set annualleave = 10, sickleave = 20";

 pool.query(
     queryCheck, (err4, qres4) => {
	if (err4)
	{
	console.log(err4+'\n\n\n******');
	console.log('SORRY SORRY SORRY');
	} else { 
	console.log('SUCCESS SUCCESS');
	let queryCheck2 = "Delete From employeeleave;";
		pool.query(
		 queryCheck2, (err5, qres5) => {
			 if (err5) {
				console.log('SORRY SORRY SORRY 2');
			 } else {
				 console.log('SUCCESS SUCCESS 2');
			}			
		});
	}
 });
*/

const pg = require('pg');


const pool = new pg.Pool({
  user: 'Sli',
  host:'127.0.0.1',
  database:'progresscontrolDB',
  password:'@Sli2354',
  port:'5432'
});

pool.connect(function(err, res) {
    if (err) {
        throw err;
    } else {
        console.log(' Successfully Connected to Database');
    }
});

module.exports = pool;
