// encrypting the password before storing in the database
const bcrypt = require("bcrypt");
const encrypt_password = async(password)=>{
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password,salt);
    return hash;
}
module.exports = encrypt_password;