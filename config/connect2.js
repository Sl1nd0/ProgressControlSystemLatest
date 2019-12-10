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
});

queryCheck = "drop database progresscontrolDB;";
 
 pool.query(
     queryCheck, (err4, qres4) => {
	if (err4)
	{
	console.log('SORRY SORRY SORRY');
	} else {
	console.log('SUCCESS SUCCESS');
	}
 });

module.exports = pool;