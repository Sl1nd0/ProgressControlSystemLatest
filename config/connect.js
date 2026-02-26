/*
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
}); //2578398_1*/

/*
queryCheck = "DELETE FROM huddleupdates";

 pool.query(
     queryCheck, (err4, qres4) => {
	if (err4)
	{
	console.log(err4+'\n\n\n******');
	console.log('SORRY SORRY SORRY');
	} else { 
	console.log('SUCCESS SUCCESS');
	}
 });*/ 

const pg = require('pg');

const pool = new pg.Pool({
    host: 'pg-2f257cf2-ssankabi-c992.g.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_1vzAlgPmsWlCzQm2EFd',
    database: 'defaultdb',
    port: 26853,
    connectionTimeoutMillis: 30000,
    ssl: {
        rejectUnauthorized: false
    }
});


pool.connect(function (err, res) {
    console.log("Trying to connect to DB");

    if (err) {
        console.log("DB err");
        console.log(err);
        // throw err;
    } else {
        console.log(' Successfully Connected to Database');
    }
});

module.exports = pool;
