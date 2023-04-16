//mongodb+srv://eefmja:<password>@cluster0.dvsyyrp.mongodb.net/?retryWrites=true&w=majority

import { MongoClient } from "mongodb";

const MONGO_URI ='mongodb+srv://eefmja:gUItaHdah7aaEi6T@cluster0.dvsyyrp.mongodb.net/?retryWrites=true&w=majority'
export async function MongoDB(){
    const client = new MongoClient(MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    
    
    let isConnected =  await client.connect();
    if(isConnected){
        console.log("Cliente conectado")
    }else{
        console.log("Erro ao conectar")
    }
    const db = client.db("JoaquimAlves")
    return {db,client}
}