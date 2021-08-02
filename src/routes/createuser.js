// this route is used to add/create a new user
const express = require("express");
const create_data = require("../controllers/createdata");
const find_doc = require("../controllers/finddoc");
const encrypt_password = require("../service/passwordencrypt");
const create_token = require("../service/token");
const password = require("../service/generatepassword");
const create_email = require("../service/email");
const {EMAIL,USER_DETAILS} = require("../helpers/environment");
const router = express.Router();


router.post("/add_user",async(req,res)=>{
    try{
        // check if the user already exists
        let check = await find_doc(USER_DETAILS,{email:req.body.email});
        if(check){
            res.status(400).send("User already exists");
        }
        else{
            //generate a random password
            let newpassword = password();
            //encrypt the passsword 
            req.body.password = await encrypt_password(newpassword);
            //create an account activation token
            let account_activation = await create_token(req.body.email);
            req.body.signup_token = account_activation;
            req.body.active = 0;
            //insert all the data into DB
            await create_data(USER_DETAILS,req.body);
            // send activation email
            let transporter = create_email();
            let info = await transporter.sendMail({
                from: EMAIL, // sender address
                to: req.body.email, // list of receivers
                subject: "Account Activation link", // Subject line
                text: `Hello! Your account with invoice creation app has been successfully created. Please click on the link to activate your account and enter the below credentials.\n Username: ${req.body.email} \n Password: ${newpassword}`
                //${URL+"activateaccount/"+account_activation}`, // plain text body 
              });
              console.log("Message sent: %s", info.messageId);
              res.status(200).send("User added successfully!!");   
        }     
    }
    catch(error){
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});
module.exports = router;