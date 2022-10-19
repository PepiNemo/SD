import { KafkaClient, Producer, KeyedMessage, Consumer } from "kafka-node"
import { aplicacion } from "./App.js"

//Aqui en un futuro se conectara con Kafka y tal vez con Postgres

aplicacion.listen(3000, () => {
    console.log('Funcionando en el puerto 3000')
})


//Definimos los tipicos a crear
let topicsToCreate = [{
    topic: 'topic1',
    partitions: 3  
    },
  {
    topic: 'topic2',
    partitions: 3,
  }
]

//Creamos un cliente de Kafka para crear los topicos
const client = new KafkaClient({ kafkaHost: "kafka://kafka:9092" })
client.createTopics(topicsToCreate, (error, result) => {
    console.log(result)
  });



const producer = new Producer(client)
const km = new KeyedMessage('key', 'message')
const payloads = [
    { topic: 'topic1', messages: 'hi', partition: 0 },
    { topic: 'topic2', messages: ['hello', 'world', km] }
];

//Publicamos el payloads cada 5 segundos con setInterval
producer.on('ready', function () {
    setInterval(()=> {
        producer.send(payloads, function (err, data) {
            console.log(data);
        }, 5000)
    });
});
 
producer.on('error', function (err) {})


const consumer = new Consumer(client, [{ topic: 'topic1'}])
consumer.on('message', (message) => {
    console.log(message)
})
