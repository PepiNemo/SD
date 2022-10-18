import { Router } from "express"
import { RegistrarMiembro, EliminarMiembro } from "../controllers/miembro.controller.js"

const router = Router()
router.post("/RegistarMiembro", RegistrarMiembro)
router.delete("/EliminarMiembro", EliminarMiembro)

export const RouterMiembro = router