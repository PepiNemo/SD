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

export const EliminarMiembro = async (req, res) => {
    (req.body?.id)
        ? res.status(200).json({"message" : `Eliminando un Miembro con id ${req.body.id}`})
        : res.status(404).json({"message": "Falta indicar el id del Miembo a eliminar en el body"})
}