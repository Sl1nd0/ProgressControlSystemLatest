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
queryCheck = "CREATE TABLE public.progressaccount (";

queryCheck += " userid serial PRIMARY KEY,  username character varying(50) NOT NULL,  usersurname character varying(50) NOT NULL, ";
 queryCheck += " userbirthdate timestamp without time zone NOT NULL,  startdate timestamp without time zone NOT NULL,  userposition character varying(50) NOT NULL, ";
  queryCheck += " useremail character varying(255) NOT NULL,  usernumber character varying(20) NOT NULL,  usergender character varying(20) NOT NULL, ";
 queryCheck += " userpassword character varying(50) NOT NULL,  useridentity character varying(13),  workid character varying(2) NOT NULL,  activestatus character varying(20) DEFAULT 'deactive' )";

 
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