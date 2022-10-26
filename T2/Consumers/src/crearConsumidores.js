import { Kafka, logLevel } from "kafkajs"

const host = process.env.KAFKA_HOST_IP

const kafkaCli = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`${host}:9092`],
    clientId: 'Cliente',
})

//Leemos los topics con 2 clientes distintos, para ambos y solo un topic
const consumer1 = kafkaCli.consumer({ groupId: 'group1' })
const consumer2 = kafkaCli.consumer({ groupId: 'group2' })
const consumer3 = kafkaCli.consumer({groupId: 'group3'})
const consumer4 = kafkaCli.consumer({groupId: 'group4'})

export async function inicializar(){
    
    await consumerVentas.connect()
    await consumerStock.connect()
    await consumerCoor.connect()
    await consumerMiembro.connect()

    await consumerVentas.subscribe({ topic: 'Ventas', fromBeginning: true })
    await consumerStock.subscribe({ topic: 'Stock', fromBeginning: false})
    await consumerCoor.subscribe({ topic: 'Coordenadas', fromBeginning: false})
    await consumerMiembro.subscribe({topic: 'Miembros', fromBeginning:true})
}


export const consumerVentas = consumer1
export const consumerStock = consumer2
export const consumerCoor = consumer3
export const consumerMiembro = consumer4