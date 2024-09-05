import express from "express";
import 'dotenv/config'
import { envs } from "./config/envs.plugin";
import { MongoDatabase } from "./data/init";
import { IncidentModel } from "./data/models/incident.model";
import { AppRoutes } from "./src/presentation/controllers/routes";

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
    await MongoDatabase.connect({ 
        dbName: "IncidentAPI", 
        mongoUrl: envs.MONGO_URL ?? "" 
    });
})();

app.get("/", (req, res)=>{
    res.send("Hola mundo");
});

app.post("/", async (req, res) => {
    const { title, description, lat, lng } = req.body
    const newIncident = await IncidentModel.create({
        title,
        description,
        lat,
        lng
    });
    res.send("Registro Creado")
});

app.listen(envs.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${envs.PORT}`)
});
