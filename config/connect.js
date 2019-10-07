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
 
queryCheck = " CREATE TABLE worksite";
queryCheck += "  ( ";
 queryCheck += " siteid serial NOT NULL, ";
queryCheck += "  sitename character varying(100), ":
queryCheck += "  red character varying(10), ";
queryCheck += "  green character varying(10), ";
queryCheck += "  blue character varying(10) ";
queryCheck += " ); ";
 pool.query(
     queryCheck, (err4, qres4) => {
 });

module.exports = pool;