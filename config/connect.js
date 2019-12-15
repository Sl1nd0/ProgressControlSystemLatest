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
/*
queryCheck = "ALTER TAble progressaccount ";
queryCheck += "add column annualleave integer default 10; ";
// queryCheck += " locationstatus integer NOT NULL, userid integer REFERENCES progressAccount (userid), locationdate Timestamp not null) ";

 pool.query(
     queryCheck, (err4, qres4) => {
	if (err4)
	{
	console.log(err4+'\n\n\n******');
	console.log('SORRY SORRY SORRY');
	} else {
	console.log('SUCCESS SUCCESS');
	}
 });*/

module.exports = pool;