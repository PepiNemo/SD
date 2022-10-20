import { publiclar } from "../services/kafka.methods.js"

export const RegistarVenta = async (req, res) => {
    if(req.body?.idCliente){
        publiclar({
            topic: "Ventas",
            message: `Nueva venta para el cliente ${req.body.idCliente}`
        })
        return res.status(200).json({"message" : "Registrando Venta"})
    }else{
        return res.status(404).json({"message" : "Error al registrar la venta "})
    }
}

export const EliminarVenta = async (req, res) => {
    (req.body?.id)
        ? res.status(200).json({"message" : `Eliminando Venta con id ${req.body?.id}`})
        : res.status(404).json({"message": "Falta indicar el id de la venta a elimiar en el body"})
}