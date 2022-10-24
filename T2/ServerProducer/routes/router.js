import { Router } from "express"
import { RegistrarMiembro, RegistarVenta, CarritoProfugo } from "./controllers/controller.js"

const router = Router()
router.post("/RegistarMiembro", RegistrarMiembro)
router.post("/RegistrarVenta", RegistarVenta)
router.post("/CarritoProfugo", CarritoProfugo)

export const Router = router