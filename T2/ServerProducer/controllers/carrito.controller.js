export const CarritoProfugo = async (req, res) => {
    (req.body?.id)
    ? res.status(200).json({"message" : `Reportando carrito profugo ${req.body.id} `})
    : res.status(404).json({"message" : `Falta indicar el id del carrito `})
    
}

export const PosicionCarrito = async (req, res) => {
    (req.body?.id)
    ? res.status(200).json({"message" : `Aqui se enviara las posiciones de los carritos ${req.body.id}`})
    : res.status(404).json({"message" : `Falta indicar el id del carrito `})
}