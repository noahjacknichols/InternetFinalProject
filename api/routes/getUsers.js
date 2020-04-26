var express = require("express");
var router = express.Router();

const con = require("./conn");


function queryData(){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      return result;
    });
  })
}

  



router.get("/", function(req,res,next){
    res.send(queryData());
});

module.exports = router;