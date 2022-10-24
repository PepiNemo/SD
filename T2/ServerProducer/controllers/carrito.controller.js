import { publiclar } from "../services/kafka.methods.js"

export const CarritoProfugo = async (req, res) => {
    if(req.body?.id && req.body?.Posicion){
        publiclar({
            topic: 'Coordenadas',
            message: `Carrito profugo ${req.body.id}`
        })
        return res.status(200).json({"message" : `Reportando carrito profugo ${req.body.id} `})
    }else{res.status(404).json({"message" : `Falta indicar el id del carrito o la Posicion`})}
    
}

export const PosicionCarrito = async (req, res) => {
    if(req.body?.id){
        publiclar({
            topic: 'Coordenadas',
            message: `Posicion del Carrito /${req.body.id}/ es |${req.body.Posicion}| `
        })
        return res.status(200).json({"message" : `Aqui se enviara las posiciones de los carritos ${req.body.id}`})
    }else{ return res.status(404).json({"message" : `Falta indicar el id del carrito `})}
}
