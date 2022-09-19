const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./searchURL.proto"
const protoLoader = require("@grpc/proto-loader");


const { pool } = require("./src/dbconnector");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};




//Importar la estructura RPC y pedir los datos a Postgres
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const URLsearch = grpc.loadPackageDefinition(packageDefinition).URLsearch;

//Creamos el servidor grpc
const server_grpc = new grpc.Server();

const query = `select * from URLs where keywords like '%' || $1 || '%'`;

//Creamos el servicio que sera llamado por el cliente, si es que la keywords no esta en cache.
server_grpc.addService(URLsearch.service, {
  GetServerResponse: async (call, callback) => {
    const busqueda = call.request.message;
    const postgres_client = await pool.connect();
    postgres_client
      .query(query, [busqueda])
      .then(res => {
        callback(null, { url: res.rows });
        console.log(res.rows);
        })
      .catch(e => console.error(e.stack))
      .then(postgres_client.release())
  }});

server_grpc.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server grpc running at http://127.0.0.1:50051");
    server_grpc.start();
  }
);