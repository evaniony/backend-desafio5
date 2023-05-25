import express from "express";
export const routerProductos = express.Router();
import { productos } from "../utils.js"; 
import { uploader } from "../utils.js";

//INICIO ENDPOINT//
//muestra el dato; simple.
routerProductos.get("/", (req, res)=>{
    //?price=500&name=maceta
    //req.query
    //es indispensable el uso de estatos, para darle una coherencia a tu api;
    if(req.query && req.query.price){
        const priceFilter = productos.filter( e => e.price == req.query.price);
        return res.status(200).json(
            {status: "success",
            msg: "Producto encontrado, cuyo precio es !: " + req.query.price,
            data: priceFilter });

    }else{
        //muestra todos los productos;
        return res.status(200).json(
            {status: "success",
            msg: "Productos encontrados!: ",
            data: productos });
    }
});


routerProductos.get("/:id", (req, res)=>{
    const id = req.params.id;
    const producto = productos.find(prod => prod.id == id);

    if(producto){
        return res.status(200).json({
            status: "success",
            msg: "Producto encontrado!: ",
            data: producto });
    }else{
        return res.status(404).json({
            status: "error",
            msg: "Producto no encontrado.",
            data: {} });

    }
});



routerProductos.delete("/:id", (req, res)=>{
    const id = req.params.id;
    //const producto = productos.find(prod => prod.id == id);
    productos = productos.filter(prod => prod.id != id);
        return res.status(200).json({
            status: "success",
            msg: "Producto filtrado! ",
            data: {} });
});


//subir la foto con multer;
routerProductos.post("/", uploader.single("file"), (req, res)=>{
    console.log(req.file);
    if(!req.file){
        res.status(400).send({
            status: "error",
            msg: "error, no enviaste una foto!",
            data: {}
        });
    }

    const body = req.body;
    //condicional para sumar un id el el array;
    body.id = (Math.random()*10).toFixed(0);
    body.file = "http://localhost:8080/" + req.file.filename;
    productos.push(body);
        return res.status(200).json({
        status: "success",
        msg: "Nuevo producto!",
        data: body });
});



routerProductos.put("/:id", (req, res)=>{
    const id = req.params.id;
    const body = req.body;

    const indice = productos.findIndex(prod => prod.id == id);
    if(indice == -1){
        res.status(404).send({status: "error",
        msg: "Error, le prodcuto no existe;",
        data: {}});
    }else{
        productos[indice] = {...body, id: productos[indice].id };
        res.status(201).send(
            {status: "success",
        msg: "Enhorabuena! El producto se ha creado!",
        data: productos[indice]});
    }

});
//FIN ENDPOINT//