const express = require("express");
const router = express.Router();
router.get("/hasloggedin/:id",async(req,res)=>{
    try{
        
       
            if(req.session.cookie)
            res.status(200).send("This is user is logged in");
        
        else{
            res.status(404).send("User is not logged in");
        }
    }
    catch(error){
        res.status(500).send("Internal server error");
        console.log(error);
    }
});
module.exports = router;