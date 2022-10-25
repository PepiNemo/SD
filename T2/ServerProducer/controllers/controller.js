import { publiclar } from "../services/kafka.methods.js"

export const RegistrarMiembro = async (req, res) => {
    if(req.body?.Nombre &&
        req.body?.Apellido &&
        req.body?.Rut &&
        req.body?.Correo &&
        req.body?.Patente &&
        req.body?.Suscripcion
    ){
        const { Nombre, Apellido, Rut, Correo, Patente, Suscripcion} = req.body
        publiclar({
            topic: 'Miembros',
            message: `${Nombre}|${Apellido}|${Rut}|${Correo}|${Patente}|${Suscripcion}`
        })
        return res.status(200).json({"message" : `Registrando un Miembro ${req.body.Nombre}`})
    }else{
        return res.status(404).json({"message": "Error en los parametros al registar un miembro"})
    }
}

export const RegistarVenta = async (req, res) => {
    if(req.body?.idCarrito &&
        req.body?.idCliente &&
        req.body?.cantidadSopaipilla &&
        req.body?.stockRestante &&
        req.body?.ubicacionCarrito        
    ){
        const { idCarrito, idCliente, cantidadSopaipilla, hora, stockRestante, ubicacionCarrito} = req.body
        var hora2 = Date.now()
        publiclar({
            topic: "Ventas",
            message: `${idCarrito}|${idCliente}|${cantidadSopaipilla}|${hora2}`
        })
        publiclar({
            topic: "Stock",
            message: `${idCarrito}|${stockRestante}`
        })
        publiclar({
            topic: "Coordenadas",
            message: `${idCarrito}|${ubicacionCarrito}|${hora2}`
        })
        return res.status(200).json({"message" : "Registrando Venta"})
    }else{
        return res.status(404).json({"message" : "Falta algun parametro al registrar la venta "})
    }
}


export const CarritoProfugo = async (req, res) => {
    if(req.body?.id && req.body?.Posicion){
        publiclar({
            topic: 'Coordenadas',
            message: `Carrito profugo ${req.body.id}`
        })
        return res.status(200).json({"message" : `Reportando carrito profugo ${req.body.id} `})
    }else{res.status(404).json({"message" : `Falta indicar el id del carrito o la Posicion`})}
    
}
