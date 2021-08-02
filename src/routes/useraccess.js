// this route allows to update the user access
const express = require("express");
const router = express.Router();
const find_doc = require("../controllers/finddoc");
const modifyfield = require("../controllers/modifyfield");
const {USER_DETAILS} = require("../helpers/environment");
router.put("/useraccess",async(req,res)=>{
    try{
        // check if user exists
        let checkuser = await find_doc(USER_DETAILS,{email:req.body.email});
        if(checkuser){
            //update access
            await modifyfield(USER_DETAILS,"add","email",req.body.email,req.body);
            res.status(200).send("Access Updated!");   
        }
        else{
            res.status(404).send("User not found!");
        }
    }
    catch(error){
        res.status(500).send("Internal Server error!");
        console.log(error);
    }
});
module.exports = router;