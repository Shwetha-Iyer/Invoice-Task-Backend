// this route is used when a user forgets the password
const express = require("express");
const router = express.Router();
const find_doc = require("../controllers/finddoc");
const password = require("../service/generatepassword");
const modifyfield = require("../controllers/modifyfield");
const create_token = require("../service/token");
const create_email = require("../service/email");
const {EMAIL,USER_DETAILS} = require("../helpers/environment");
router.put("/forgot",async(req,res)=>{
    try{
        // check if the email exists
        let checkuser = await find_doc(USER_DETAILS,{email:req.body.email});
        if(checkuser){
            //generate a random string
            let randomstring = password();
            //generate a token
            let newtoken = await create_token(req.body.email); 
            let obj={secretkey:randomstring,pass_token:newtoken};
            //add token and secretkey to db
            await modifyfield(USER_DETAILS,"add","email",req.body.email,obj);
            // send the email containing random string and password reset link
            let transporter = create_email();
            let info = await transporter.sendMail({
                from: EMAIL, // sender address
                to: req.body.email, // list of receivers
                subject: "Reset Password Link", // Subject line
                text: `Hello! Please click on the link to reset the password with the secret string.\n Secret Key: ${randomstring}`
                //${URL+"activateaccount/"+new_token}`, // plain text body 
              });
              console.log("Message sent: %s", info.messageId);
            res.status(200).send("Email sent successfully");
        }
        else{
            res.status(404).send("Email ID does not exist");
        }
    }
    catch(error){
        res.status(500).send("Internal server error");
        console.log(error);
    }
});
module.exports = router;