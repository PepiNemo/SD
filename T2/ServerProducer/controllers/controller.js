import { publiclar } from "../services/kafka.methods.js"

export const RegistrarMiembro = async (req, res) => {
    if(req.body?.Nombre){
        publiclar({
            topic: 'Miembros',
            message: `Solicitud nuevo Miembro ${req.body.Nombre}`
        })
        return res.status(200).json({"message" : `Registrando un Miembro ${req.body.Nombre}`})
    }else{
        return res.status(404).json({"message": "Error al registar un miembro"})
    }
}

export const RegistarVenta = async (req, res) => {
    if(req.body?.idCliente){
        const { idCarrito, idCliente, cantidadSopaipilla, hora, stockRestante, ubicacionCarrito} = req.body
        hora = Date.now()
        publiclar({
            topic: "Ventas",
            message: `${idCarrito}|${idCliente}|${cantidadSopaipilla}|${hora}`
        })
        publiclar({
            topic: "Stock",
            message: `${idCarrito}|${stockRestante}`
        })
        publiclar({
            topic: "Coordenadas",
            message: `idCarrito|${ubicacionCarrito}|${hora}`
        })
        return res.status(200).json({"message" : "Registrando Venta"})
    }else{
        return res.status(404).json({"message" : "Error al registrar la venta "})
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
