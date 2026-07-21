import { ObjectId } from "mongodb";
import { getDB } from "../common/db.js";
import { Actor } from "./actor.js";

const actorCollection = () => getDB().collection("actor");
const peliculaCollection = () => getDB().collection("pelicula");

// Inserta un actor, validando que la película exista según su nombre
export const handleInsertActorRequest = async (req, res) => {
    const { idPelicula, nombre, edad, estaRetirado, premios } = req.body;

    peliculaCollection()
        .findOne({ nombre: idPelicula })
        .then((peliculaEncontrada) => {
            if (!peliculaEncontrada) {
                return res.status(404).json({ error: "La película indicada no existe" });
            }

            const nuevoActor = {
                idPelicula: peliculaEncontrada._id.toString(),
                nombre,
                edad,
                estaRetirado,
                premios,
            };

            actorCollection()
                .insertOne(nuevoActor)
                .then((resultado) => {
                    res.status(201).json({ _id: resultado.insertedId, ...nuevoActor });
                })
                .catch((error) => {
                    res.status(500).json({ error: "Error al insertar el actor", detalle: error.message });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: "Error al validar la película", detalle: error.message });
        });
};

// Obtiene todos los actores
export const handleGetActoresRequest = async (req, res) => {
    actorCollection()
        .find({})
        .toArray()
        .then((actores) => {
            res.status(200).json(actores);
        })
        .catch((error) => {
            res.status(500).json({ error: "Error al obtener los actores", detalle: error.message });
        });
};

// Obtiene un actor por su _id
export const handleGetActorByIdRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const _id = new ObjectId(id);

        actorCollection()
            .findOne({ _id })
            .then((actor) => {
                if (!actor) {
                    return res.status(404).json({ error: "Actor no encontrado" });
                }
                res.status(200).json(actor);
            })
            .catch((error) => {
                res.status(500).json({ error: "Error al buscar el actor", detalle: error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado" });
    }
};

// Obtiene todos los actores de una película, según el _id de la película
export const handleGetActoresByPeliculaIdRequest = async (req, res) => {
    const { pelicula } = req.params;

    try {
        const idPeliculaValido = new ObjectId(pelicula);

        actorCollection()
            .find({ idPelicula: idPeliculaValido.toString() })
            .toArray()
            .then((actores) => {
                res.status(200).json(actores);
            })
            .catch((error) => {
                res.status(500).json({ error: "Error al obtener los actores de la película", detalle: error.message });
            });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado" });
    }
};