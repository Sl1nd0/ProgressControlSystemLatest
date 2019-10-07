const pg = require('pg');
let queryCheck = "";

const pool = new Pool({
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

queryCheck = "CREATE database progresscontrolDB;";
 pool.query(
     queryCheck, (err4, qres4) => {
 });

module.exports = pool;