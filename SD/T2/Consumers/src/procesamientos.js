import { createWriteStream } from "fs";

import { dbCarrosProfugos } from "../index.js"

export let dbProceVentas = createWriteStream('./txt/helloworld.txt', { flags: 'a' })

function estadisticasVentas(ventasMap, dia){
  console.log(`----------------- Procesamiento Ventas Dia ${dia} -----------------`)
  database.write(`\n----------------- Procesamiento Ventas Dia ${dia} -----------------`)
  dia = dia + 1;
  ventasMap.forEach(async(value, key, map) =>{
    const clientes = new Set()
    let totalVentas = 0
    value.forEach((value, index, array) => {
      clientes.add(value.idCliente)
      totalVentas = totalVentas + value.cantidadSopaipillas
    })

    
    console.log(`Para el sopaipellero ${key} se tiene:`)
    console.log({
      "VentasTotales": ventasMap.size,
      "PromedioVentas": totalVentas / ventasMap.size,
      "ClientesTotales": clientes.size
    })

    dbProceVentas.write(`\nPara el sopaipellero ${key} se tiene:`);
    dbProceVentas.write(`\n"VentasTotales": ${ventasMap.size},
    "PromedioVentas": ${totalVentas / ventasMap.size},
    "ClientesTotales": ${clientes.size}`);
  })
  return Promise.resolve("yes")
}


export function procesamientoCincoMensajes(publicacionesStock){
  publicacionesStock.forEach((value, index, array) => {
    const [Patente, stockRestante] = value.split("|");
    if (stockRestante < 20) {
      console.log({
        topic: "Stock",
        value: `El carrito ${Patente} necesita reposicion de stock.`,
      });
    }
  });
  return Promise.resolve("yes")
}

export function procesamientoTiempoReal(carritosMap, carritosProfugosMap){
  setTimeout(() => {
     setInterval(()=> {
       carritosMap.forEach( (value, key, map) =>{
         if(Date.now() - value.timestamp > 60000 ){
           carritosProfugosMap.set(key, value.ubicacionCarrito)
           carritosMap.delete(key)
           dbCarrosProfugos.write(`\n${key}|${value.ubicacionCarrito}`)
         }
       })
       if(carritosMap.size > 0){
         console.log("Posicion de Carritos: ",carritosMap)
       }
       if(carritosProfugosMap.size > 0){
         console.log("Posicion de carritos profugos: ", carritosProfugosMap)
       }
     },1000)
   },5000)
 }

let dia = 0;
export function procesamientoDiario(ventasMapDebito, ventasMapEfectivo){
 setTimeout(() => {
    setInterval(async () => {
      if(ventasMapDebito.size > 0 && ventasMapEfectivo.size > 0){
        await estadisticasVentas(ventasMapDebito, dia);
        await estadisticasVentas(ventasMapEfectivo, dia );
      }else if(ventasMapDebito.size > 0){
        estadisticasVentas(ventasMapDebito, dia);
      }else if(ventasMapEfectivo.size > 0){
        estadisticasVentas(ventasMapEfectivo, dia);
      }
    }, 20000 )
  }, 10000)
}

export function procesamientoMensual(miembrosMap, miembrosMapPremium){
  setTimeout(async() => {
    setInterval(() => {
      if( miembrosMapPremium.size > 0){
        console.log("Lista de miembros Premium: ",miembrosMapPremium)
      }
    }, 100000)
    setInterval(() => {
      if( miembrosMap.size > 0){
        console.log("Lista de miembros no Premium: ",miembrosMap)
      }
    }, 120000)
  }, 20000)
}


