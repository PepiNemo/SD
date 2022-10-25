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
        if(Suscripcion == "Premium"){
            publiclar({
                topic: 'Miembros',
                message: `${Nombre}|${Apellido}|${Rut}|${Correo}|${Patente}|${Suscripcion}`,
                partition: 1
            })
        }else {
            publiclar({
                topic: 'Miembros',
                message: `${Nombre}|${Apellido}|${Rut}|${Correo}|${Patente}|${Suscripcion}`
            })
        }

        return res.status(200).json({"message" : `Registrando un Miembro ${req.body.Nombre}`})
    }else{
        return res.status(404).json({"message": "Error en los parametros al registar un miembro"})
    }
}

export const RegistarVenta = async (req, res) => {
    if(req.body?.Patente &&
        req.body?.idCliente &&
        req.body?.cantidadSopaipilla &&
        req.body?.stockRestante &&
        req.body?.ubicacionCarrito        
    ){
        const { Patente, idCliente, cantidadSopaipilla, hora, stockRestante, ubicacionCarrito} = req.body
        var hora2 = Date.now()
        publiclar({
            topic: "Ventas",
            message: `${Patente}|${idCliente}|${cantidadSopaipilla}|${hora2}`
        })
        publiclar({
            topic: "Stock",
            message: `${Patente}|${stockRestante}`
        })
        publiclar({
            topic: "Coordenadas",
            message: `${Patente}|${ubicacionCarrito}|${hora2}`
        })
        return res.status(200).json({"message" : "Registrando Venta"})
    }else{
        return res.status(404).json({"message" : "Falta algun parametro al registrar la venta "})
    }
}


export const CarritoProfugo = async (req, res) => {
    if(req.body?.Patente && req.body?.ubicacionCarrito){
        publiclar({
            topic: 'Coordenadas',
            message: `${req.body.Patente}|${req.body.ubicacionCarrito}`,
            partition: 1
        })
        return res.status(200).json({"message" : `Reportando carrito profugo ${req.body.id} `})
    }else{res.status(404).json({"message" : `Falta indicar el id del carrito o la Posicion`})}
    
}
