import {Producer, KafkaClient, KeyedMessage} from "kafka-node"
const client = new KafkaClient()
const producer = new Producer(client)

const km = new KeyedMessage('key', 'message')
const payloads = [
    { topic: 'topic1', messages: 'hi', partition: 0 },
    { topic: 'topic2', messages: ['hello', 'world', km] }
];

const publicar = () => {
    producer.send(payloads, function(err, data){
        console.log(data);
    })
}