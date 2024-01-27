import Kasir from "../models/kasirModel.js";
import path from "path";
import fs from "fs";

export const getKasir = async(req, res) => {
    try {
        const response = await Kasir.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getKasirById = async(req, res) => {
    try {
        const response = await Kasir.findOne({
            where: {
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const saveKasir = (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "Invalid Data Error"});
    const name = req.body.title;
    const file = req.files.file;
    const price = req.body.price;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.jpg', '.png', '.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "File error must be ['.jpg', '.png', '.jpeg']"});
    if(fileSize > 5000000) return res.status(422).json({msg: "File Size Max 5mb"});

    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(400).json({msg: err.message})
        try {
            await Kasir.create({name: name, image: fileName, url: url, price: price});
            res.status(201).json({msg: "Data Created Succesfully"});
        } catch (error) {
            console.log(error.message)
        }
    });
}

export const updateKasir = async(req, res) => {
    const kasir = await Kasir.findOne({
        where: {
            id : req.params.id
        }
    });
    let fileName = "";
    if(req.files === null) {
        fileName = kasir.image;
    } else {
        const file = req.files.file;
        const fileSize = file.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.jpg', '.jpeg', '.png'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "File error must be ['.jpg', '.png', '.jpeg']"});
        if(fileSize > 5000000) return res.status(422).json({msg: "File Size Max 5mb"});

        const linkpath = `./public/images/${kasir.image}`;
        fs.unlinkSync(linkpath);
        
        try{
            file.mv(`./public/images/${fileName}`, (err) => {
                if(err) return res.status(err.message);
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    const name = req.body.title;
    const price = req.body.price;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Kasir.update({name: name, image: fileName, url: url, price: price}, {
            where: {
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Updated Succesfully"});
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteKasir = async(req, res) => {
    const kasir = await Kasir.findOne({
        where: {
            id : req.params.id
        }
    });
    if(!kasir) return res.status(404).json({msg: "Data Not Found"});
    try {
        const linkpath = `./public/images/${kasir.image}`;
        fs.unlinkSync(linkpath);
        await Kasir.destroy({
            where: {
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted Succesfully"})
    } catch (error) {
        
    }
}