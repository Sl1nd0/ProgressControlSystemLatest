const pg = require('pg');
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

queryCheck = "alter table employeeleave add column leavetype varchar(12); ";

 pool.query(
     queryCheck, (err4, qres4) => {
	if (err4)
	{
	console.log(err4+'\n\n\n******');
	console.log('SORRY SORRY SORRY');
	} else {
	console.log('SUCCESS SUCCESS');
	}
 });

/*
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

module.exports = pool;
*/