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

//queryCheck = "create database progresscontrolDB;";
queryCheck = "CREATE TABLE employeeleave (  leaveid serial PRIMARY KEY, userid integer, managerid integer, manageremail character varying(100) NOT NULL, ";
queryCheck += " leavestatus character varying(50) DEFAULT NULL::character varying, startdate timestamp without time zone NOT NULL, ";
queryCheck += " enddate timestamp without time zone NOT NULL, leavenote character varying(500) ) ";
 
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