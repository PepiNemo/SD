function estadisticasVentas(VentasMap){
  console.log("----------------- Procesamiento Ventas Diarias -----------------")
  VentasMap.forEach((value, key, map) =>{
    const clientes = new Set()
    let totalVentas = 0
    value.forEach((value, index, array) => {
      clientes.add(value.idCliente)
      totalVentas = totalVentas + value.cantidadSopaipilla
    })
    console.log(`Para el sopaipellero ${key} se tiene:`)
    console.log({
      "VentasTotales": map.size,
      "PromedioVentas": totalVentas / map.size,
      "ClientesTotales": clientes.size
    })
    
  })
}



export function procesamientoDia(VentasMap){
 setTimeout(() => {
    setInterval(() => {
      if(VentasMap.size > 0){
        estadisticasVentas(VentasMap)
      }
    
    }, 50000 )
    
  }, 10000)
}


export function procesamientoTiempoReal(carritosMap, carritosProfugosMap){
 setTimeout(() => {
    setInterval(()=> {
      carritosMap.forEach( (value, key, map) =>{
        if(Date.now() - value.timestamp > 60000 ){
          carritosProfugosMap.set(key, value.ubicacionCarrito)
          carritosMap.delete(key)
        }
      })
      if(carritosMap.size > 0){
        console.log(carritosMap)
      }
      if(carritosProfugosMap.size > 0){
        console.log(carritosProfugosMap)
      }
      
    },1000)
  },5000)
}