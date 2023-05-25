import express from "express";
export const routerVistaSocket = express.Router();

//inicio endpoint//
routerVistaSocket.get("/", (req, res)=>{
    return res.render("chat-socket", {});
});
//fin endpoint//