const {DBURL,DBNAME} = require("./environment");
const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const connectDB = async()=>{
    let client = await mongoClient.connect(DBURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    let db = client.db(DBNAME);
    return db;
};
const objectId = mongoDB.ObjectID;
module.exports = {connectDB,objectId};