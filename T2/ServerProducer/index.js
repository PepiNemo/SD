import { aplicacion } from "./App.js"
import { createTopics, publiclar } from "./services/kafka.methods.js"

async function  serverSetup (){
    //Como Servidor productor, creamos los topicos y probamos publicando unos mensajes en los topicos
    await createTopics()

    aplicacion.listen(3000, () => {
        console.log('Funcionando en el puerto 3000')
    })
}

serverSetup()








