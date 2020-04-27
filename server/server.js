
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'database-2.ckb7qqal4m5l.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'STUPID_SHIT'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  })

  

  
  