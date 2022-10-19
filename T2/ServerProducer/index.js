import {  Kafka, logLevel } from "kafkajs"
import { aplicacion } from "./App.js"
import ip from "ip"

//Aqui en un futuro se conectara con Kafka y tal vez con Postgres

async function  kafkaSetup (){
    //Creamos un cliente de Kafka para crear los topicos

    const host = process.env.KAFKA_HOST_IP || ip.address()

    const kafka = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`${host}:9092`],
    clientId: 'example',
    })
    
    const admin = kafka.admin()
    await admin.connect()
    const ITopicConfig = [{
        topic: "test-topic",
        numPartitions: 3,     
    }]
    await admin.createTopics({
        topics: ITopicConfig
    })

    const producer = kafka.producer()
    await producer.connect()
    //Publicamos el payloads cada 5 segundos con setInterval
    setInterval(async ()=> {
        producer.send({
            topic: 'test-topic',
            messages: [
              { value: 'Hello KafkaJS user!' },
            ],
        }, 10000)
    })

    const Consumer = kafka.consumer({ groupId: 'test-group' })
    await Consumer.connect()
    await Consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await Consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
          })
        },
    })

}

aplicacion.listen(3000, () => {
    console.log('Funcionando en el puerto 3000')
})

kafkaSetup()





