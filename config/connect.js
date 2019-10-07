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
 
queryCheck = "CREATE TABLE employeeleave ";
 queryCheck += "( ";
  queryCheck += " leaveid serial NOT NULL, ";
 queryCheck += " userid integer, ";
  queryCheck += " managerid integer, ";
  queryCheck += " manageremail character varying(100) NOT NULL,";
 queryCheck += "  leavestatus character varying(50) DEFAULT NULL::character varying, ";
 queryCheck += "  startdate timestamp without time zone NOT NULL, ";
queryCheck += "   enddate timestamp without time zone NOT NULL, ";
  queryCheck += " leavenote character varying(300), ";
queryCheck += "   leavetype character varying(20) ) ";
 pool.query(
     queryCheck, (err4, qres4) => {
 });

module.exports = pool;