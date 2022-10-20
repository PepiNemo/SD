import { aplicacion } from "./App.js"
import { createTopics, publiclar } from "./services/kafka.methods.js"

async function  kafkaSetup (){
    //Como Servidor productor, creamos los topicos y probamos publicando unos mensajes en los topicos
    await createTopics()
    await publiclar({
      topic:'test-topic', 
      message:'Hello KafkaJS user test-topic!', 
      time:3000})
    await publiclar({
        topic:'topic2', 
        message:'Hello Topic 2!!', 
        time:10000})
}

kafkaSetup()
aplicacion.listen(3000, () => {
    console.log('Funcionando en el puerto 3000')
})







