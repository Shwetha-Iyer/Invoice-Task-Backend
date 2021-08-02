const express = require("express");
const find_doc = require("../controllers/finddoc");
const {objectId} = require("../helpers/connection");
const {USER_DETAILS} = require("../helpers/environment");
const router = express.Router();
router.get("/dashboard/:id",async(req,res)=>{
    try{
        let user_details = await find_doc(USER_DETAILS,{_id:objectId(req.params.id)});
        if(user_details){
            delete user_details["password"];
            res.status(200).send(user_details);
        }
        else
        res.status(404).send("Invalid user");
    }
    catch(error){
        res.status(500).send("Internal server error");
        console.log(error);
    }
});
module.exports = router;
