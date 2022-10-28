import { kafka } from "./conect.Kafka.js"


export async function createTopics(){
    const admin = kafka.admin()
    const ITopicConfig = [{
        topic: "Ventas",
        numPartitions: 2    
    },{
        topic: "Stock",
        numPartitions: 2
    },{
        topic: "Coordenadas",
        numPartitions: 2
    },{
        topic: "Miembros",
        numPartitions: 2
    }]

    await admin.connect()
    await admin.createTopics({
        topics: ITopicConfig
    })

}

export async function publiclar({topic, message, partition}){
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({topic, messages:[{value: message, partition}]})
}

