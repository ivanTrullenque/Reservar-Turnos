
import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(()=>{
    console.log("Conectado a la base de datos")
    server.listen(PORT, ()=>{
        console.log(`listening on ${PORT}`)
    })
})
.catch((error)=> console.log(error))

