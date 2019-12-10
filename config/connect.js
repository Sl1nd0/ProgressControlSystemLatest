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
//queryCheck = "create database progresscontrolDB;";
queryCheck = "CREATE TABLE huddleupdates(  huddleid serial PRIMARY KEY, huddledate timestamp without time zone NOT NULL, ";
 queryCheck += " accomplishyesterday text NOT NULL, accomplishtoday text NOT NULL, obstacles character varying(500) NOT NULL, needhelp character varying(400) NOT NULL, ";
  queryCheck += "  userid integer REFERENCES progressAccount(userid), workid character varying(2) NOT NULL );";

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
*/
module.exports = pool;