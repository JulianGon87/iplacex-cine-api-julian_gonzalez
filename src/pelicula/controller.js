import { ObjectId } from "mongodb";
import { getDB } from "../common/db.js";
import { Pelicula } from "./pelicula.js";

const peliculaCollection = () => getDB().collection("pelicula");

export const handleInsertPeliculaRequest = async (req, res) => {
    const { nombre, generos, anioEstreno } = req.body;

    const nuevaPelicula = {
        nombre,
        generos,
        anioEstreno,
    };

    peliculaCollection()
        .insertOne(nuevaPelicula)
        .then((resultado) => {
            res.status(201).json({ _id: resultado.insertedId, ...nuevaPelicula });
        })
        .catch((error) => {
            res.status(500).json({ error: "Error al ingresar la película", detalle: error.message });
        });
};

export const handleGetPeliculasRequest = async (req, res) => {
    peliculaCollection()
        .find({})
        .toArray()
        .then((peliculas) => {
            res.status(200).json(peliculas);
        })
        .catch((error) => {
            res.status(500).json({ error: "Error al obtener las películas", detalle: error.message });
        });
};

export const handleGetPeliculaByIdRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const _id = new ObjectId(id);

        peliculaCollection()
            .findOne({ _id })
            .then((pelicula) => {
                if (!pelicula) {
                    return res.status(404).json({ error: "Película no encontrada" });
                }
                res.status(200).json(pelicula);
            })
            .catch((error) => {
                res.status(500).json({ error: "Error al buscar la película", detalle: error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado" });
    }
};

export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    const { id } = req.params;
    const { nombre, generos, anioEstreno } = req.body;

    try {
        const _id = new ObjectId(id);

        peliculaCollection()
            .updateOne({ _id }, { $set: { nombre, generos, anioEstreno } })
            .then((resultado) => {
                if (resultado.matchedCount === 0) {
                    return res.status(404).json({ error: "Película no encontrada" });
                }
                res.status(200).json({ mensaje: "Película actualizada correctamente" });
            })
            .catch((error) => {
                res.status(500).json({ error: "Error al actualizar la película", detalle: error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado" });
    }
};

export const handleDeletePeliculaByIdRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const _id = new ObjectId(id);

        peliculaCollection()
            .deleteOne({ _id })
            .then((resultado) => {
                if (resultado.deletedCount === 0) {
                    return res.status(404).json({ error: "Película no encontrada" });
                }
                res.status(200).json({ mensaje: "Película eliminada correctamente" });
            })
            .catch((error) => {
                res.status(500).json({ error: "Error al eliminar la película", detalle: error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado" });
    }
};