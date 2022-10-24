import { Kafka, logLevel } from "kafkajs"

const host = process.env.KAFKA_HOST_IP

const kafkaCli = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`${host}:9092`],
    clientId: 'Cliente',
})

//Leemos los topics con 2 clientes distintos, para ambos y solo un topic
const consumerVentas = kafkaCli.consumer({ groupId: 'group1' })
const consumerStock = kafkaCli.consumer({ groupId: 'group2' })
const consumerCoor = kafkaCli.consumer({groupId: 'group3'})
const consumerMiembro = kafkaCli.consumer({groupId: 'group4'})

await consumerVentas.connect()
await consumerStock.connect()
await consumerCoor.connect()
await consumerMiembro.connect()

await consumerVentas.subscribe({ topic: 'Ventas', fromBeginning: true })
await consumerStock.subscribe({ topic: 'Stock', fromBeginning: false})
await consumerCoor.subscribe({ topic: 'Coordenadas', fromBeginning: false})
await consumerMiembro.subscribe({topic: 'Miembros', fromBeginning:true})

consumerVentas.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic: topic,
        partition: partition,
        value: message.value.toString(),
      })
    }
})

consumerStock.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic: topic,
        partition: partition,
        value: message.value.toString(),
      })
    }
})

const carritos = new Map()
consumerCoor.run({
  eachMessage: async ({ topic, partition, message }) => {
    const mensaje = message.value.toString()
    const dateNow = message.timestamp
    const idCarro = mensaje.split("/")[1]
    const coo = mensaje.split("|")[1]
    carritos.set(idCarro, {coo, timestamp: message.timestamp} )
    carritos.forEach( (value, key, map) =>{
      //console.log(dateNow, key, value['timestamp'])
      if(dateNow - value.timestamp > 60000 ){carritos.delete(key)}
    })
    
    console.log(carritos)

  }
})

consumerMiembro.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      topic: topic,
      partition: partition,
      value: message.value.toString(),
    })
  }
})