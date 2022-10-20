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

consumerCoor.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      topic: topic,
      partition: partition,
      value: message.value.toString(),
    })
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