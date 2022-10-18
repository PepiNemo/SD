export const RegistrarMiembro = async (req, res) => {
    res.status(200).json({"message" : "Registrando un Miembro"})
}

export const EliminarMiembro = async (req, res) => {
    (req.body?.id)
        ? res.status(200).json({"message" : `Eliminando un Miembro con id ${req.body.id}`})
        : res.status(404).json({"message": "Falta indicar el id del Miembo a eliminar en el body"})
}