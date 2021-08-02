const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user_accessSchema = new Schema({
    title:{type:String, required:true},
    create_admin:{type:Boolean, required:true},
    create_manager:{type:Boolean, required:true},
    create_employee:{type:Boolean, required:true},
},{_id:false});
const invoice_accessSchema = new Schema({
    create:{type:Boolean,required:true},
    read:{type:Boolean,required:true},
    update:{type:Boolean,required:true},
    delete:{type:Boolean,required:true},
},{_id:false})
const Invoice = new Schema({
    email: {type: String, required:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    password:{type: String, required:true},
    user_access:{type: user_accessSchema, required:true},
    invoice_access:{type: invoice_accessSchema, required:true}
});

module.exports = mongoose.model("invoice_users",Invoice);