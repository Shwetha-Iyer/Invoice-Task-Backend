// this route is used for logging into the portal
const express = require("express");
const find_doc = require("../controllers/finddoc");
const bcrypt = require("bcrypt");
const router = express.Router();
const modifyfield = require("../controllers/modifyfield");
const {USER_DETAILS} = require("../helpers/environment");

router.post("/login",async(req,res)=>{
    try{
        //check if the user exists 
        let checkuser = await find_doc(USER_DETAILS,{email:req.body.email});
        if(checkuser){
            //check the status of account 
            if(checkuser.active===0){
                res.status(406).send("Your account is not activated! Please activate your account.");
            }
            else if(checkuser.active===-1){
                res.status(403).send("Your account is locked!");
            }
            else{
                //verify the password
                let checkpassword = await bcrypt.compare(req.body.password,checkuser.password);
                if(checkpassword){
                    //create session
                    req.session.user = checkuser._id;
                    //console.log(req.session);
                    console.log(req.session.user);
                    //if count was present remove it
                    if(checkuser.count){
                        await modifyfield(USER_DETAILS,"del","email",req.body.email,{count:1});
                    }
                    //delete checkuser["password"];
                    res.status(200).json({_id:checkuser._id,title:checkuser.user_access.title});
                }
                else{
                    if(checkuser.count!==undefined){
                        if(checkuser.count===3){
                            //set active as -1; res 403
                            await modifyfield(USER_DETAILS,"add","email",req.body.email,{active:-1});
                            res.status(403).send("Your account is locked!");
                        }
                        else{
                            //inc count to 1 res 401
                            await modifyfield(USER_DETAILS,"add","email",req.body.email,{count:checkuser.count+1});
                            res.status(401).send("Wrong Password!");
                        }
                    }
                    else{
                        //set count to 0 res 401
                        await modifyfield(USER_DETAILS,"add","email",req.body.email,{count:0});
                        res.status(401).send("Wrong Password!");
                    } 
                }
            }    
        }
        else{
            res.status(404).send("User does not exist");
        }
    }
    catch(error){
        res.status(500).send("Internal server error");
        console.log(error);
    }
});
module.exports = router;