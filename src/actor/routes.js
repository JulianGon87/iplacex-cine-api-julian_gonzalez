import express from "express";
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest,
} from "./controller.js";

const ActorRoutes = express.Router();

ActorRoutes.post("/actor", handleInsertActorRequest);
ActorRoutes.get("/actores", handleGetActoresRequest);
ActorRoutes.get("/actor/:id", handleGetActorByIdRequest);
// NOTA: la pauta indica la ruta "/actor/:pelicula" para el endpoint, pero este
// colisionaria con "/actor/:id" (ambas tienen la forma "/actor/<segmento>"), y segun tengo
// entendido, en express la primera ruta declarada que coincide es la que se ejecuta siempre.
// por lo que el endpoint de búsqueda por película quedaria inalcanzable. 
// Se agrega el segmento "/pelicula/" para diferenciar ambas rutas:
//   GET /api/actor/:id            -> busca un actor por su _id
//   GET /api/actor/pelicula/:id   -> busca todos los actores de una película
ActorRoutes.get("/actor/pelicula/:pelicula", handleGetActoresByPeliculaIdRequest);

export default ActorRoutes;