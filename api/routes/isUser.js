var express = require("express");
var router = express.Router();
const con = require("./conn");


function queryData(username, pass){
    
    var toQuery = "SELECT * FROM users WHERE username = '" +username + "' AND password = '"+pass + "'";
    console.log(toQuery);
    con.query(toQuery, function (err, result, fields) {
        if(err) throw err;
        console.log(result);
        var count = 0;
        Object.keys(result).forEach(function(key){
            count +=1;
        });
        console.log(count);
        if(count > 0){
            return 'true';
        }else{
            return 'false';
        }
        // return result;
    });
}

router.get("/", function(req,res,next){
    

    console.log("query is:")
    console.log(req.query)
    // return queryInfo;
    var user = req.query.user;
    var pass = req.query.pass;
    res.send(queryData(user, pass));
    // con.end((err) => {
    //     console.log("closing request");
    // });
});

module.exports = router;