import express from "express";
import {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest,
} from "./controller.js";

const peliculaRoutes = express.Router();

peliculaRoutes.post("/pelicula", handleInsertPeliculaRequest);
peliculaRoutes.get("/peliculas", handleGetPeliculasRequest);
peliculaRoutes.get("/pelicula/:id", handleGetPeliculaByIdRequest);

// La pauta indica el verbo "UPDATE", pero dicho verbo no existe en el estándar HTTP
// Por compatibilidad con lo solicitado, dejo disponible PUT y UPDATE 
peliculaRoutes.put("/pelicula/:id", handleUpdatePeliculaByIdRequest);
peliculaRoutes.all("/pelicula/:id", (req, res, next) => {
    if (req.method === "UPDATE") {
        return handleUpdatePeliculaByIdRequest(req, res);
    }
    next();
});

peliculaRoutes.delete("/pelicula/:id", handleDeletePeliculaByIdRequest);

export default peliculaRoutes;