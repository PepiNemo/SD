import { Kafka, logLevel } from "kafkajs"

const host = process.env.KAFKA_HOST_IP

export const kafka = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`${host}:9092`],
    clientId: 'example',
})