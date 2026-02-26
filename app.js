const { Pool } = require('pg');

const pool = new Pool({
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

/*const client = new Pool({
    host: 'database-1.clgyou2s6qxr.eu-north-1.rds.amazonaws.com',
    user: 'postgres',
    password: '_vlE6Tq91J7Om-CE8ePLYs#ouH6*',
    database: 'postgres',  
    port: 5432,
  connectionTimeoutMillis: 30000,
});*/
pool.connect(function (err, res) {
	if (err) {
		console.log(err);
	} else {
		console.log(' Successfully Connected to Database');
	
	var query = 
	`
--SELECT * FROM progressAccount
--WHERE useremail = 'myworkcv951006@gmail.com'

DELETE FROM progressAccount
WHERE useremail = 'myworkcv951006@gmail.com'


	`
	
	 pool.query(
            query, (err4, qres4) => {
		   if (err4)
		   {
			   console.log(err4);
		   } else {
				console.log(qres4);
		   }
					
		});

	}
});

//queryDatabase();