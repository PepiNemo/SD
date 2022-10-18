import { Router } from "express"
import { RegistarVenta, EliminarVenta} from "../controllers/venta.controller.js"

const router = Router()
router.post("/RegistrarVenta", RegistarVenta)
router.delete("/EliminarVenta", EliminarVenta)

export const RouterVenta = router