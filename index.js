const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const session = require("express-session");

const {PORT,DBURL} = require("./src/helpers/environment");
const createuser = require("./src/routes/createuser");
const activate = require("./src/routes/activateaccount");
const login = require("./src/routes/login");
const forgot = require("./src/routes/forgotpassword");
const resetpwdcheck = require("./src/routes/resetpwdcheck");
const resetpwd = require("./src/routes/resetpwd");
const useraccess =require("./src/routes/useraccess");
const createinvoice =require("./src/routes/createinvoice");
const updateinvoice = require("./src/routes/updateinvoice");
const readinvoice = require("./src/routes/readinvoice");
const deleteinvoice = require("./src/routes/deleteinvoice");
const hasloggedin = require("./src/routes/hasloggedin");
const logout = require("./src/routes/logout");
const dashboard = require("./src/routes/dashboard");
const MongoStore = require("connect-mongo");
// const MongoStore = connectStore(session);
// import session from "express-session";
// import connectStore from "connect-mongo";
// const MongoStore = connectStore(session);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,maxAge: 100*60*60*24 },
    store: MongoStore.create({
        mongoUrl: DBURL,
        autoRemove: 'native'
    })
  }));
//creating a user
app.use("/invoice",createuser);
//activate user
app.use("/account",activate);
//login 
app.use("/auth",login);
//forgot password
app.use("/password",forgot);
//passwordcheck
app.use("/forgot",resetpwdcheck);
//reset password
app.use("/reset",resetpwd);
//update access
app.use("/update",useraccess);
//create invoice
app.use("/create",createinvoice);
//update invoice
app.use("/updateinv",updateinvoice);
//read invoice
app.use("/read",readinvoice);
//delete invoice
app.use("/delete",deleteinvoice);
app.use("/logged",hasloggedin);
app.use("/leave",logout);
app.use("/dash",dashboard);
app.listen(PORT, ()=> console.log("App running on port:",PORT));