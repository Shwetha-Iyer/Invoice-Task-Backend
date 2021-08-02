const nodemailer = require("nodemailer");
const {EMAIL,PASS} = require("../helpers/environment");
const create_email = ()=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        service:"hotmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL, // generated ethereal user
            pass: PASS, // generated ethereal password
          },
      });
    return transporter;
}
module.exports = create_email;