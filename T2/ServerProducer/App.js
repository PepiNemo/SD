import express from "express"

import { RouterMiembro } from "./routes/miembro.router.js"
import { RouterCarrito } from "./routes/carrito.router.js"
import { RouterVenta } from "./routes/venta.router.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/Miembro",RouterMiembro)
app.use("/Carrito",RouterCarrito)
app.use("/Venta",RouterVenta)

export const aplicacion = app



