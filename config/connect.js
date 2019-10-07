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
 
queryCheck = " CREATE TABLE huddleupdates";
queryCheck += "( huddleid serial NOT NULL, ";
 queryCheck += " huddledate timestamp without time zone NOT NULL, ";
  queryCheck += " accomplishyesterday text NOT NULL, ";
 queryCheck += "  accomplishtoday text NOT NULL, ";
queryCheck += "  obstacles character varying(500) NOT NULL, ";
queryCheck += "  needhelp character varying(400) NOT NULL, ";
queryCheck += "  userid integer, ";
queryCheck += "  workid character varying(5), ";

 queryCheck += "     REFERENCES progressaccount (userid) MATCH SIMPLE ";

queryCheck += " ); ";
 pool.query(
     queryCheck, (err4, qres4) => {
 });

module.exports = pool;