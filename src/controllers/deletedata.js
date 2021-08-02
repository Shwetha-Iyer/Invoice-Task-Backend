// delete a document from DB
const {connectDB,objectId} = require("../helpers/connection");
const delete_doc = async (collection_name,fieldvalue)=>{
    try{
        let db = await connectDB();
        let result = await db.collection(collection_name).deleteOne(fieldvalue);
        return result;
    }
    catch(error){
        console.log(error);
    }
}
module.exports = delete_doc;