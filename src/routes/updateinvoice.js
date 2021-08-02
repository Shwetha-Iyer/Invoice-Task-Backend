//update invoice
const express = require("express");
const router = express.Router();
const modifyfield = require("../controllers/modifyfield");
const {INVOICE_DETAILS} = require("../helpers/environment");
router.put("/updateinvoice/:id",async(req,res)=>{
    try{
        //update the data
        await modifyfield(INVOICE_DETAILS,"add","_id",req.params.id,req.body);
        res.status(200).send("Invoice Modified");
    }
    catch(error){
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});
module.exports = router;