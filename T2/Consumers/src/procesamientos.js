function estadisticasVentas(ventasMap){
  console.log("----------------- Procesamiento Ventas Diarias -----------------")
  ventasMap.forEach((value, key, map) =>{
    const clientes = new Set()
    let totalVentas = 0
    value.forEach((value, index, array) => {
      clientes.add(value.idCliente)
      totalVentas = totalVentas + value.cantidadSopaipillas
    })
    console.log(`Para el sopaipellero ${key} se tiene:`)
    console.log({
      "VentasTotales": ventasMap.size,
      "PromedioVentas": (totalVentas / ventasMap.size),
      "ClientesTotales": clientes.size
    })
 
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

export function procesamientoDiario(ventasMapDebito, ventasMapEfectivo){
 setTimeout(() => {
    setInterval(async () => {
      if(ventasMapDebito.size > 0 && ventasMapEfectivo.size > 0){
        await estadisticasVentas(ventasMapDebito);
        await estadisticasVentas(ventasMapEfectivo);
      }else if(ventasMapDebito.size > 0){
        estadisticasVentas(ventasMapDebito);
      }else if(ventasMapEfectivo.size > 0){
        estadisticasVentas(ventasMapEfectivo);
      }
    }, 10000 )
  }, 10000)
}

export function procesamientoMensual(miembrosMapPremium, miembrosMap){
  setTimeout(async() => {
    setInterval(() => {
      if( miembrosMapPremium.size > 0){
        console.log(miembrosMapPremium)
      }
    }, 10000)
    setInterval(() => {
      if( miembrosMap.size > 0){
        console.log(miembrosMap)
      }
    }, 20000)
  }, 20000)
}


