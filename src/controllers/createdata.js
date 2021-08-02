// inserting a new data into the DB
const {connectDB} = require("../helpers/connection");
const create_data = async(collection_name,user_data)=>{
        try{
                let db = await connectDB();
                await db.collection(collection_name).insertOne(user_data);
        }
        catch(error){
                console.log(error);
        }
}
module.exports = create_data;