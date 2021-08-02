// find a document from DB
const {connectDB} = require("../helpers/connection");
const find_doc = async (collection_name,fieldvalue)=>{
    try{
        let db = await connectDB();
        let result = await db.collection(collection_name).findOne(fieldvalue);
        return result;
    }
    catch(error){
        console.log(error);
    }
}
module.exports = find_doc;