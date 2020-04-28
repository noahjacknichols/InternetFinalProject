var express = require("express");
var router = express.Router();
const con = require("./conn");

const handleQuery = async (user_id) => {
    return new Promise((resolve, reject) => {
        var toQuery = "SELECT * FROM appointments WHERE user_id = '" + user_id + "'";
        console.log(toQuery);

        con.query(toQuery, (err, result) => {
            if(err){ return reject(err)};
            resolve(result); 
        });
    })
}

router.get("/", async (req,res) => {
    console.log("query is:")
    console.log(req.query)
    
    var user_id = req.query.user_id;
    let toSend = await handleQuery(user_id);
    console.log("BIG RESPONSE:")
    console.log(toSend);
    res.json(toSend);
    // con.end((err) => {
    //     console.log("closing request");
    // });
});

module.exports = router;