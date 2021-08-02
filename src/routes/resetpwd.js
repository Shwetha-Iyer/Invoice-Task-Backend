// reset the password
const express = require("express");
const router = express.Router();
const encrypt_password = require("../service/passwordencrypt");
const modifyfield = require("../controllers/modifyfield");
const {USER_DETAILS} = require("../helpers/environment");
router.put("/resetpwd/:token", async(req,res)=>{
    try{
        //encrypt the password
        req.body.password = await encrypt_password(req.body.password);
        //activate the account and update password
        await modifyfield(USER_DETAILS,"add","pass_token",req.params.token,{active:1,password:req.body.password});
        //delete the token and secretkey
        await modifyfield(USER_DETAILS,"del","pass_token",req.params.token,{pass_token:1,secretkey:1});
        res.status(200).send("Password changed!");
    }
    catch(error){
        res.status(500).send("Internal server error");
        console.log(error);
    }
});
module.exports = router;