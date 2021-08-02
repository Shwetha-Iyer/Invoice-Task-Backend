// this route is used to create a new invoice
const express = require("express");
const create_data = require("../controllers/createdata");
const find_doc = require("../controllers/finddoc");
const create_email = require("../service/email");
const {USER_DETAILS,EMAIL,INVOICE_DETAILS} = require("../helpers/environment");
const router = express.Router();
router.post("/invoice",async(req,res)=>{
    try{
        // insert the data to DB
        await create_data(INVOICE_DETAILS,req.body);
        let user = req.body.created_by;
        //get admin, manager, employee emails
        let email = "";
        while(user){
            email+=", "+user;
            data = await find_doc(USER_DETAILS,{email:user});
            user = data.user_access.updated_by;
        }
        email+=", "+req.body.client_details.email;
        let transporter = create_email();
        let info = await transporter.sendMail({
            from: EMAIL, // sender address
            to: email, // list of receivers
            subject: "New Invoice has been created", // Subject line
            text: `Hello! This is to inform you that a new invoice has been created`
            //${URL+"activateaccount/"+account_activation}`, // plain text body 
          });
          console.log("Message sent: %s", info.messageId);
          res.status(200).send("Invoice created successfully!!");
    }
    catch(error){
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});
module.exports = router;