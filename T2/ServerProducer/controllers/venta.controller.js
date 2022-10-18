export const RegistarVenta = async (req, res) => {
    res.status(200).json({"message" : "Registrando Venta"})
}

export const EliminarVenta = async (req, res) => {
    (req.body?.id)
        ? res.status(200).json({"message" : `Eliminando Venta con id ${req.body?.id}`})
        : res.status(404).json({"message": "Falta indicar el id de la venta a elimiar en el body"})
}