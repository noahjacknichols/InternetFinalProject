const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'database-2.ckb7qqal4m5l.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'STUPID_SHIT',
  });





module.exports = con;