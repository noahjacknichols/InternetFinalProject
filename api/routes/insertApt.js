var express = require("express");
var router = express.Router();
const con = require("./conn");

const handleQuery = async (user_id, fname, lname, date, time, type, loc) => {
    return new Promise((resolve, reject) => {
        var toQuery = "SELECT * FROM appointments WHERE user_id='" + user_id + "' AND first_name='" + fname +"' AND last_name='" + lname + "' AND apt_date='" + date + "' AND apt_time='"+time + "' AND apt_type='"+ type + "' AND location='" +loc +"'";
        console.log(toQuery);

        con.query(toQuery, (err, result) => {
            if(err){ return reject(err)};
            resolve(result); 
        });
    })
}

const handleInsertion = async (user_id, fname, lname, date, time, type, loc) => {
    return new Promise((resolve, reject) => {
        var toQuery = "INSERT INTO appointments VALUES ('" + user_id + "', '" + fname + "', '" + lname + "', '" + date + "', '" + time + "', '" + type + "', '" + loc + "')"
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

    var user_id = req.query.user_id;
    var fname = req.query.fname;
    var lname = req.query.lname;
    var date = req.query.date;
    var time = req.query.time;
    var type = req.query.type
    var loc = req.query.loc;

    let toSend = await handleQuery(user_id, fname, lname, date, time, type, loc);
    if (toSend == '') {
        toSend = await handleInsertion(user_id, fname, lname, date, time, type, loc);
        console.log("RESPONSE:")
        console.log(toSend);
        res.json(toSend);

    } else {
        res.json('Failed')
    }
    
});

module.exports = router;