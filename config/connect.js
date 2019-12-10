const pg = require('pg');


const pool = new pg.Pool({
  user: 'Sli',
  host:'127.0.0.1',
  database:'progresscontrolDB',
  password:'@Sli2354',
  port:'5432'
});

pool.connect(function(err, res) {
    if (err) {
        throw err;
    } else {
        console.log(' Successfully Connected to Database');
    }
});

module.exports = pool;