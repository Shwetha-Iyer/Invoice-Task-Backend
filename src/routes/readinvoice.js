const express = require("express");
const router = express.Router();
const find_doc = require("../controllers/finddoc");
const findmany_doc = require("../controllers/findmanydoc");
const {INVOICE_DETAILS} = require("../helpers/environment");
const {objectId} = require("../helpers/connection");
router.post("/readinvoice",async(req,res)=>{
    try{
        if(req.body.id){
            let checkinvoice = await find_doc(INVOICE_DETAILS,{_id:objectId(req.body.id)});
            if(checkinvoice)
                res.status(200).send([checkinvoice]);
            else
                res.status(404).send("No such invoice found!");
        }
        else if(!req.body){
            let checkinvoice = await findmany_doc(INVOICE_DETAILS,"");
            if(checkinvoice)
                res.status(200).send(checkinvoice);
            else
                res.status(404).send("No invoices found!");
        }
        else{
            let checkinvoice = await findmany_doc(INVOICE_DETAILS,req.body);
            if(checkinvoice)
                res.status(200).send(checkinvoice);
            else
                res.status(404).send("Invoices do not exist");
        }
    }
    catch(error){
        res.status(500).send("Internal Server error!");
        console.log(error);
    }
});
module.exports = router;