const express = require("express");
const router = express.Router();
const delete_doc = require("../controllers/deletedata");
const {INVOICE_DETAILS} = require("../helpers/environment");
const {objectId} = require("../helpers/connection");
router.delete("/deleteinvoice",async(req,res)=>{
    try{
        let result=await delete_doc(INVOICE_DETAILS,{_id:objectId(req.body.id)});
        if(result.deletedCount===1)
        res.status(200).send("Invoice Deleted");
        else
        res.status(404).send("Object Id was not found!");
    }
    catch(error){
        res.status(500).send("Internal Server error!");
        console.log(error);
    }
});
module.exports = router;