const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./src/controllers/searchURL.proto"
var Redis = require('redis')
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

//Conectamos a Redis Master
const redis_client = Redis.createClient({ url: 'redis://redis' });
redis_client.on('error', (err) => console.log('Redis Client Error', err));
redis_client.on('ready',()=>{
    console.log("Redis listo")
    console.log("-------------------------------------------------------------------------------------------------------------")
})
redis_client.connect();
console.log('Redis conection controler: '+redis_client.isOpen);


//Importar la estructura RPC y el metodo para pedir los datos al server RPC
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const URLsearch= grpc.loadPackageDefinition(packageDefinition).URLsearch;
const server_grpc = new URLsearch("grpc_server:50051", grpc.credentials.createInsecure());

//Realizamos la busqueda de la keywords, si esta en cache o pedirla al server_grpc por gRPC 
const searchUrl=(req,res)=>{
    const busqueda=req.query.keyword
    let cache = null;
    (async () => { 
        let reply = await redis_client.get(busqueda);
        console.log("Busqueda: "+busqueda)
        if(reply){
            cache = JSON.parse(reply);
            console.log("Encontrado en Caché!")
            console.log("Resultados:")
            console.log(cache['url'])
            console.log("--------------------------------------------------------------------------------------------------------------------------------")
            res.status(200).json(cache)
        }
        else{
            console.log("No se ha encontrado en Caché, Buscando en Postgres...")
            server_grpc.GetServerResponse({message:busqueda}, (error,items) =>{
                if(error){    
                    res.status(400).json(error);
                }
                else{
                    data = JSON.stringify(items)
                    if (data['url']!==null){
                        redis_client.set(busqueda,data)
                        res.status(200).json(items);
                    }
                }
            });
        } 
    })();
}



module.exports={
 searchUrl
}