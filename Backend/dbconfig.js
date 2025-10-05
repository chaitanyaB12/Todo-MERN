import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();

const url=process.env.MONGO_URL;
const dbName=process.env.DB_NAME;

export const collectionName="todo";
const client = new MongoClient(url);

export const connection = async ()=>{ 
    const connect = await client.connect();
    return await connect.db(dbName);
}