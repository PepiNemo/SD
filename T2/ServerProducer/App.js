import express from "express"

import { RouterServer } from "./routes/router.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/", RouterServer)

export const aplicacion = app



