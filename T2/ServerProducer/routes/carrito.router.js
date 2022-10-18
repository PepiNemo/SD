import { Router } from "express"
import { CarritoProfugo, PosicionCarrito } from "../controllers/carrito.controller.js"

const router = Router()
router.post("/CarritoProfugo", CarritoProfugo)
router.patch("/PosicionCarrito", PosicionCarrito)

export const RouterCarrito = router