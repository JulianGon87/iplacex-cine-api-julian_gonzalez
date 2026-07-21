import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import dns from "node:dns";

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_APPNAME, MONGO_DB } = process.env;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=${MONGO_APPNAME}`;

const client = new MongoClient(uri);

let db;

export async function connectDB() {
    try {
        await client.connect();
        db = client.db(MONGO_DB);
        console.log("Conexión exitosa a MongoDB Atlas.");
        return db;
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error.message);
        throw error;
    }
}

export function getDB() {
    if (!db) {
        throw new Error("La base de datos no ha sido inicializada. Llama a connectDB() primero.");
    }
    return db;
}