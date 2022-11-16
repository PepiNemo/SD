import { Router } from "express"
import { RegistrarMiembro, RegistarVenta, CarritoProfugo } from "../controllers/controller.js"

const router = Router()
router.post("/RegistrarMiembro", RegistrarMiembro)
router.post("/RegistrarVenta", RegistarVenta)
router.post("/CarritoProfugo", CarritoProfugo)

export const RouterServer = router