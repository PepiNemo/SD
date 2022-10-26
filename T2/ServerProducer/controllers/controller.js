import { publiclar } from "../services/kafka.methods.js";

export const RegistrarMiembro = async (req, res) => {
  if (
    req.body?.Nombre &&
    req.body?.Apellido &&
    req.body?.Rut &&
    req.body?.Correo &&
    req.body?.Patente &&
    req.body?.Suscripcion
  ) {
    const { Nombre, Apellido, Rut, Correo, Patente, Suscripcion } = req.body;

    Suscripcion == "Premium"
      ? publiclar({
          topic: "Miembros",
          message: `${Nombre}|${Apellido}|${Rut}|${Correo}|${Patente}|${Suscripcion}`,
          partition: 1,
        })
      : publiclar({
          topic: "Miembros",
          message: `${Nombre}|${Apellido}|${Rut}|${Correo}|${Patente}|${Suscripcion}`,
          partition: 0,
        });

    return res
      .status(200)
      .json({ message: `Registrando un Miembro ${req.body.Nombre}` });
  } else {
    return res
      .status(404)
      .json({ message: "Error en los parametros al registar un miembro" });
  }
};

export const RegistarVenta = async (req, res) => {
  if (
    req.body?.Patente &&
    req.body?.idCliente &&
    req.body?.cantidadSopaipillas &&
    req.body?.stockRestante &&
    req.body?.ubicacionCarrito &&
    req.body?.metodoPago
  ) {
    const {
      Patente,
      idCliente,
      cantidadSopaipillas,
      hora,
      stockRestante,
      ubicacionCarrito,
      metodoPago,
    } = req.body;

    var hora2 = Date.now();
    publiclar({
      topic: "Coordenadas",
      message: `${Patente}|${ubicacionCarrito}|${hora2}`,
      partition: 0,
    });

    let particionVenta, particionStock;
    const sumaCoordenadas = ubicacionCarrito.split(",").reduce((a,b) => parseInt(a)+parseInt(b));
    metodoPago == "Efectivo" ? (particionVenta = 0) : (particionVenta = 1);
    sumaCoordenadas < 6 ? (particionStock = 0) : (particionStock = 1);

    publiclar({
      topic: "Ventas",
      message: `${Patente}|${idCliente}|${cantidadSopaipillas}|${hora2}|${metodoPago}`,
      partition: particionVenta,
    });
    publiclar({
      topic: "Stock",
      message: `${Patente}|${stockRestante}`,
      partition: particionStock,
    });

    return res
      .status(200)
      .json({ message: "Venta en cola de Registrar venta " });
  } else {
    return res
      .status(404)
      .json({ message: "Falta algun parametro al registrar la venta " });
  }
};

export const CarritoProfugo = async (req, res) => {
  if (req.body?.Patente && req.body?.ubicacionCarrito) {
    publiclar({
      topic: "Coordenadas",
      message: `${req.body.Patente}|${req.body.ubicacionCarrito}`,
      partition: 1,
    });
    return res
      .status(200)
      .json({ message: `Reportando carrito profugo ${req.body.id} ` });
  } else {
    res
      .status(404)
      .json({ message: `Falta indicar el id del carrito o la Posicion` });
  }
};
