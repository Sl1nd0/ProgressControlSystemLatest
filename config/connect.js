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
 
queryCheck = "CREATE TABLE postlocation ";
queryCheck += " ( ";
queryCheck += "  locationid serial NOT NULL, ";
queryCheck += "    sitename character varying(50) NOT NULL, ";
queryCheck += "    locationmessage character varying(500) NOT NULL, ";
 queryCheck += "   locationstatus integer NOT NULL, ";
 queryCheck += "  userid integer, ";
queryCheck += "    locationdate timestamp with time zone); ";
  

 pool.query(
     queryCheck, (err4, qres4) => {
 });

module.exports = pool;