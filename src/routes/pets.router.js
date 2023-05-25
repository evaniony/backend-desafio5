import express from "express";
import { pets } from "../utils.js";
export const routerPets = express.Router();

//inicio endpoint//
routerPets.get("/", (req, res)=>{
    return res.status(200).json(
        {status: "success",
        msg: "All pets!: ",
        data: pets});
});
//fin endpoint//