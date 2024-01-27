import {
    getKasir,
    getKasirById,
    saveKasir,
    updateKasir,
    deleteKasir
} from "../controller/kasirController.js";
import express from "express";

const route = express.Router();

route.get('/kasir', getKasir);
route.get('/kasir/:id', getKasirById);
route.post('/kasir', saveKasir);
route.patch('/kasir/:id', updateKasir);
route.delete('/kasir/:id', deleteKasir);

export default route;