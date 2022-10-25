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

consumerMiembro.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      topic: topic,
      partition: partition,
      value: message.value.toString(),
    })
  }
})


let timeStart = Date.now()
const VentasMap = new Map();
consumerVentas.run({
    eachMessage: async ({ topic, partition, message }) => {
      const [idCarrito, idCliente, cantidadSopaipilla, hora2] = message.value.toString().split("|");
      if(VentasMap.has(idCarrito)){
        VentasMap.get(idCarrito).push({idCliente, cantidadSopaipilla, hora2})
      }else{
        VentasMap.set(idCarrito, [{idCliente, cantidadSopaipilla, hora2}])
      }
      
    },
})

const UnDia = setTimeout(() => {
  setInterval(() => {
    console.log("Topic: Ventas")
    console.log(VentasMap)  
  }, 10000 )
  
}, 15000);

let consultas = []
consumerStock.run({
    eachMessage: async ({ topic, partition, message }) => {
      consultas.push(message.value.toString())
      if(consultas.length == 5 ){
        consultas.forEach((value, index, array) =>{
          const [idCarrito, stockRestante] = value.split("|")
          if(stockRestante < 20) {
            console.log({
              topic,
              value: `El carrito ${idCarrito} necesita reposicion de stock.`
            })
          }
        })
        consultas = []
      }
      /*
      console.log({
        topic: topic,
        partition: partition,
        value: message.value.toString(),
      }) 
      */
    }
})

const carritos = new Map()
consumerCoor.run({
  eachMessage: async ({ topic, partition, message }) => {
    const mensaje = message.value.toString().split("|")
    //console.log(mensaje)
    const idCarro = mensaje[0]
    const ubicacionCarrito = mensaje[1]
    const timestamp = mensaje[2]
    const dateNow = Date.now()
   
    carritos.set(idCarro, {ubicacionCarrito, timestamp} )
    carritos.forEach( (value, key, map) =>{
      if(dateNow - timestamp > 60000 ){carritos.delete(key)}
    })
    
    console.log(carritos)

  }
})

