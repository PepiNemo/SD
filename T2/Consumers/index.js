import { consumerMiembro, consumerVentas, consumerCoor, consumerStock, inicializar} from "./src/crearConsumidores.js"
import { procesamientoDia, procesamientoTiempoReal } from "./src/procesamientos.js"

const miembrosMap = new Map();
const VentasMap = new Map();
let publicacionesStock = [];
const carritosMap = new Map();
const carritosProfugosMap = new Map();

async function setupConsumidores (){
  await inicializar()
  consumerMiembro.run({
    eachMessage: async ({ topic, partition, message }) => {
      const [Nombre, Apellido, Rut, Correo, Patente, Suscripcion] = message.value.toString().split("|")
      miembrosMap.set(Patente, {Nombre, Apellido, Rut, Correo, Suscripcion})
      
      console.log(miembrosMap)
    }
  })
  
  
  consumerVentas.run({
      eachMessage: async ({ topic, partition, message }) => {
        const [Patente, idCliente, cantidadSopaipilla, hora2] = message.value.toString().split("|");
        if(miembrosMap.has(Patente)){
          if(VentasMap.has(Patente)){
            VentasMap.get(Patente).push({idCliente, cantidadSopaipilla, hora2})
          }else{
            VentasMap.set(Patente, [{idCliente, cantidadSopaipilla, hora2}])
          }
        }else{
          console.log("Patente de miembro no registrada")
        }
      }
  });
  
  consumerStock.run({
      eachMessage: async ({ topic, partition, message }) => {
        const Patente = message.value.toString().split("|")[0]

        if(miembrosMap.hash(Patente)){
          publicacionesStock.push(message.value.toString())
          if(publicacionesStock.length == 5 ){
            publicacionesStock.forEach((value, index, array) =>{
              const [Patente, stockRestante] = value.split("|")
              if(stockRestante < 20) {
                console.log({
                  topic,
                  value: `El carrito ${Patente} necesita reposicion de stock.`
                })
                publicacionesStock.splice(index, 1)
              }
            })
            publicacionesStock = []
          }
        }else{
          console.log("Patente de miembro no registrada")
        }
      }
  })
  
  
  consumerCoor.run({
    eachMessage: async ({ topic, partition, message }) => {
      const mensaje = message.value.toString().split("|")
      const Patente = mensaje[0]
      const ubicacionCarrito = mensaje[1]
      if(miembrosMap.has(Patente)){
        if(partition == 0){
          const timestamp = mensaje[2]
          if(carritosProfugosMap.has(Patente)){carritosProfugosMap.splice(Patente, 1)}   
          carritosMap.set(Patente, {ubicacionCarrito, timestamp} )
        }else if(partition == 1){
          if(carritosMap.has(Patente)){carritosMap.splice(Patente, 1)}   
          carritosProfugosMap.set(Patente, ubicacionCarrito)
        }
      }else{
        console.log("Patente de miembro no registrada")
      }

  
    }
  })
  procesamientoDia(VentasMap);
  procesamientoTiempoReal(carritosMap, carritosProfugosMap)

}

setupConsumidores()







