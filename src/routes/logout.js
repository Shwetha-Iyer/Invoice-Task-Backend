const express = require("express");
const router = express.Router();

router.delete("/logout",(req,res)=>{
    try{
        console.log("inside logout");
        req.session.destroy(err=>{
            if(err) throw err;
        },req.body.id);
        res.clearCookie("connect.sid");
        res.status(200).send("Logged out");
    }
    catch(error){
        res.status(500).send("Internal server error");
        console.log(error);
    }
});
module.exports = router;