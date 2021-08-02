// find a list od documents from DB
const {connectDB} = require("../helpers/connection");
const findmany_doc = async (collection_name,fieldvalue)=>{
    try{
        let db = await connectDB();
        let result = await db.collection(collection_name).find(fieldvalue).toArray();
        return result;
    }
    catch(error){
        console.log(error);
    }
}
module.exports = findmany_doc;