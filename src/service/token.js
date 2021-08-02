// creating a token 
const jwt = require("jsonwebtoken");
const {TOKEN} = require("../helpers/environment");
const create_token = async(e_mail)=>{
    let token = await jwt.sign({email:e_mail},TOKEN);
    return token;
}
module.exports = create_token;