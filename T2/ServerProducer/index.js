import { aplicacion } from "./App.js"

//Aqui en un futuro se conectara con Kafka y tal vez con Postgres

aplicacion.listen(3000, () => {
    console.log('Funcionando en el puerto 3000')
})
