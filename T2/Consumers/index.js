import { Kafka, logLevel } from "kafkajs"

const host = process.env.KAFKA_HOST_IP

const kafkaVentas = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`${host}:9092`],
    clientId: 'CliVentas',
})

const kafkaStock = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`${host}:9092`],
    clientId: 'CliStock',
})

const kafkaCoordenadas = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: 'CliCoordenadas',
})

const kafkaMiembros = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: 'CliMiembros',
})



//Leemos los topics con 2 clientes distintos, para ambos y solo un topic
const consumerVentas = kafkaVentas.consumer({ groupId: 'group1' })
const consumerStock = kafkaStock.consumer({ groupId: 'group2' })
const consumerCoor = kafkaCoordenadas.consumer({groupId: 'group3'})
const consumerMiembro = kafkaCoordenadas.consumer({groupId: 'group4'})

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