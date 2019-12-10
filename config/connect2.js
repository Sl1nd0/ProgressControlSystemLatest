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

//queryCheck = "create database progresscontrolDB;";
queryCheck = "CREATE TABLE postlocation( locationid  serial PRIMARY KEY, sitename character varying(50) NOT NULL, locationmessage character varying(500) NOT NULL, ";
 queryCheck += " locationstatus integer NOT NULL, userid integer REFERENCES progressAccount (userid) )";
  
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

module.exports = pool;