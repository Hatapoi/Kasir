import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import KasirRoute from "./routers/kasirRoute.js";

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('public'));
app.use(KasirRoute)

const Port = 4002
app.listen(Port, () => {
    console.log(`Listening on port ${Port}`)
})