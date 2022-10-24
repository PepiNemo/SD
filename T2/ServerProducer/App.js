import express from "express"

import { Router } from "./router.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/", Router)

export const aplicacion = app



