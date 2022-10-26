import {
  consumerMiembro,
  consumerVentas,
  consumerCoor,
  consumerStock,
  inicializar,
} from "./src/crearConsumidores.js";
import {
  procesamientoCincoMensajes,
  procesamientoDiario,
  procesamientoMensual,
  procesamientoTiempoReal,
} from "./src/procesamientos.js";

const miembrosMap = new Map();
const miembrosMapPremium = new Map();

const ventasMapEfectivo = new Map();
const ventasMapDebito = new Map();

let publicacionesStock = [];
let publicacionesStockCercanas = [];

const carritosMap = new Map();
const carritosProfugosMap = new Map();

async function setupConsumidores() {
  await inicializar();

  consumerMiembro.run({
    eachMessage: ({ topic, partition, message }) => {
      const [Nombre, Apellido, Rut, Correo, Patente, Suscripcion] =
        message.value.toString().split("|");
      partition == 0
        ? miembrosMap.set(Patente, {
            Nombre,
            Apellido,
            Rut,
            Correo,
            Suscripcion,
          })
        : miembrosMapPremium.set(Patente, {
            Nombre,
            Apellido,
            Rut,
            Correo,
            Suscripcion,
          });
    },
  });

  consumerVentas.run({
    eachMessage: async ({ topic, partition, message }) => {
      const [Patente, idCliente, cantidadSopaipillas, hora2, metodoPago] =
        message.value.toString().split("|");
      if (miembrosMap.has(Patente) || miembrosMapPremium.has(Patente)) {
        if (partition == 0) {
          ventasMapEfectivo.has(Patente)
            ? ventasMapEfectivo.get(Patente).push({
                idCliente,
                cantidadSopaipillas,
                hora2,
                metodoPago,
              })
            : ventasMapEfectivo.set(Patente, [
                { idCliente, cantidadSopaipillas, hora2, metodoPago },
              ]);
        } else if (partition == 1) {
          ventasMapDebito.has(Patente)
            ? ventasMapDebito.get(Patente).push({
                idCliente,
                cantidadSopaipillas,
                hora2,
                metodoPago,
              })
            : ventasMapDebito.set(Patente, [
                { idCliente, cantidadSopaipillas, hora2, metodoPago },
              ]);
        }
      } else {
        console.log("Patente de miembro no registrada, Ventas");
      }
    },
  });

  consumerStock.run({
    eachMessage: async ({ topic, partition, message }) => {
      const Patente = message.value.toString().split("|")[0];
      if (miembrosMap.has(Patente) || miembrosMapPremium.has(Patente)) {
        partition == 0
          ? publicacionesStock.push(message.value.toString())
          : publicacionesStockCercanas.push(message.value.toString());

        if (publicacionesStock.length == 5) {
          console.log("Stock 1");
          await procesamientoCincoMensajes(publicacionesStock);
          publicacionesStock = [];
        } else if (publicacionesStockCercanas.length == 5) {
          console.log("Stock prioritario");
          await procesamientoCincoMensajes(publicacionesStockCercanas);
          publicacionesStockCercanas = [];
        }
      } else {
        console.log("Patente de miembro no registrada, Stock");
      }
    },
  });

  consumerCoor.run({
    eachMessage: async ({ topic, partition, message }) => {
      const mensaje = message.value.toString().split("|");
      const Patente = mensaje[0];
      const ubicacionCarrito = mensaje[1];
      if (miembrosMap.has(Patente) || miembrosMapPremium.has(Patente)) {
        if (partition == 0) {
          const timestamp = mensaje[2];
          if (carritosProfugosMap.has(Patente)) {
            carritosProfugosMap.delete(Patente);
          }
          carritosMap.set(Patente, { ubicacionCarrito, timestamp });
        } else if (partition == 1) {
          if (carritosMap.has(Patente)) {
            carritosMap.delete(Patente);
          }
          carritosProfugosMap.set(Patente, ubicacionCarrito);
        }
      } else {
        console.log("Patente de miembro no registrada, Coordenadas");
      }
    },
  });

  procesamientoTiempoReal(carritosMap, carritosProfugosMap);
  procesamientoDiario(ventasMapDebito, ventasMapEfectivo);
  procesamientoMensual(miembrosMap, miembrosMapPremium);
}

setupConsumidores();
