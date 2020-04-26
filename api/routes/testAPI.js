var express = require("express");
var router = express.Router();
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'database-2.ckb7qqal4m5l.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'STUPID_SHIT'
  });

var x;
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      x = result;
    });
  })

  



router.get("/", function(req,res,next){
    res.send(x);
});

module.exports = router;