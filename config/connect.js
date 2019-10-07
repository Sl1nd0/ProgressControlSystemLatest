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

//queryCheck = "CREATE database progresscontrolDB;";
 
queryCheck = "CREATE TABLE progressaccount( userid serial NOT NULL, username character varying(50) NOT NULL, usersurname character varying(50) NOT NULL, userbirthdate timestamp without time zone NOT NULL, startdate timestamp without time zone NOT NULL, userposition character varying(50) NOT NULL, ";
  queryCheck += " useremail character varying(255) NOT NULL, ";
 queryCheck += "   usernumber character varying(15) NOT NULL, ";
 queryCheck += "   usergender character varying(20) NOT NULL, ";
 queryCheck += "   userpassword character varying(50) NOT NULL, ";
  queryCheck += "  useridentity character varying(50) NOT NULL, ";
 queryCheck += "   activestatus character varying(20) DEFAULT 'deactive'::character varying, ";
  queryCheck += "  workid character varying(5), ";
  queryCheck += "  sickleave integer,";
   queryCheck += " annualleave integer";
 queryCheck += "  ); ";
 pool.query(
     queryCheck, (err4, qres4) => {
 });

module.exports = pool;