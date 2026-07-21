import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta por defecto
app.get("/", (req, res) => {
    res.send("Bienvenido al cine Iplacex");
});

// Rutas personalizadas /api
app.use("/api", peliculaRoutes);
app.use("/api", actorRoutes);

// Levanta el servidor solo si la conexión a Atlas fue exitosa
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor Express corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("No se pudo iniciar el servidor porque falló la conexión a Atlas");
    });