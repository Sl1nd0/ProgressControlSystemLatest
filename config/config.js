const pg = require('pg');


const pool = new pg.Pool({
  user: 'sli',
  host:'127.0.0.1',
  database:'progressControlDB',
  password:'@Sli2354',
  port:'5432'
});



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

module.exports = pool;