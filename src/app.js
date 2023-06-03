import express from "express";
import handlebars from "express-handlebars";
import { productos, pets } from "./utils.js";
import { routerProductos } from "./routes/productos.router.js";
import { routerPets } from "./routes/pets.router.js";
import { __dirname } from "./utils.js";
import { routerVistaSocket } from "./routes/chat.router.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;

//recibir body, con json;
app.use(express.json());
//esta linea nos ayudara a usar correstamente el req.query;
app.use(express.urlencoded( {extended: true} ));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname +"/views");
app.set("view engine", "handlebars");


//console.log(__dirname + "/public");
//archivos estaticos;
app.use(express.static(__dirname + "/public"));


//uso de router;
app.use("/productos", routerProductos);
app.use("/pets", routerPets);

//vista sockets;
//PRODUCTOS SOCKET
app.use("/realtimeproducts", routerVistaSocket);

//esta ruta, atrapa todas las rutas que no existen;
//si no se encuentra la ruta, automaticamente, cae en la ruta por defecto;
app.get("*", (req, res)=>{
    res.status(400).send({status: "error",
        msg: "Error, la ruta no existe;",
        data: {}})
})
const httpServer = app.listen(port, ()=> {
    console.log("server is on! on 8080;");
});

const socketServer = new Server(httpServer);
let products = [];
console.log(products);
//socket, es el canal compartido;
//si emitio en el back, le comparte al socket
//si emitio en el front, le comparte al socket;

//BACKEND
socketServer.on("connection", (socket) =>{
    socket.on("generate-prod", (prod) =>{
        products.push(prod);
        socketServer.emit("todos_los_productos", products);
    })
    //el mensaje + un objeto o el autor del mensaje;
    /* socket.emit("code: describe el tipo de mensaje", {
        author: "Server",
        msg: "Bienvenido!"
    });

    socket.on("desde el front", (msg) =>{
        console.log(msg);
    }); */
});
