// checks token and secret key to make sure it is a verified user
const express = require("express");
const router = express.Router();
const find_doc = require("../controllers/finddoc");
const {USER_DETAILS} = require("../helpers/environment");
router.post("/resetpwdcheck/:token",async(req,res)=>{
    try{
        let checkuser = await find_doc(USER_DETAILS,{pass_token:req.params.token});
        if(req.body.secret){
            if(checkuser.secretkey===req.body.secret)
                res.status(200).send("Secret key matches");           
            else
                res.status(401).send("Secret key does not match!");
        }
        else{
            if(checkuser)
                res.status(200).send("Token exists");
            else
                res.status(404).send("Token not found");
        }
    }
    catch(error){
        res.status(500).send("Internal server error");
        console.log(error);
    }
});
module.exports = router;