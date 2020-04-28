var express = require("express");
var router = express.Router();
const con = require("./conn");


const handleQuery = async (username, pass) => {
    return new Promise((resolve, reject) => {
        var toQuery = "SELECT * FROM users WHERE username = '" + username + "' AND password = '"+pass + "'";
        console.log(toQuery);
        var respondo = ''
         con.query(toQuery, (err, result) => {
            if(err){ return reject(err)};
            resolve(result);
            // console.log("this is the result from query: ");
            // console.log(result[0].id);
    
    
            
        });
        // return respondo;
    })

}

const handleInsertion = async (username, pass) => {
    return new Promise((resolve, reject) => {
        var toQuery = "INSERT INTO users (username, password) VALUES ('" + username + "', '" + pass + "')"
        console.log("query is:" + toQuery)
        con.query(toQuery, (err, result) => {
            if(err){ return reject(err)};
            resolve(result);
        })
    })
}

router.get("/", async (req,res) => {
    

    console.log("query is:")
    console.log(req.query)
    
    // return queryInfo;
    var user = req.query.user;
    var pass = req.query.pass;
    let toSend = await handleQuery(user, pass);
    console.log("toSend is:" + toSend)
    if(toSend == ''){
        let toSend = await handleInsertion(user, pass);
    }
    console.log("RESPONSE:")
    console.log(toSend);
    res.json(toSend);
    // con.end((err) => {
    //     console.log("closing request");
    // });
});

module.exports = router;