//en realidad, deberia ser una carpeta; pero al ser un proyecto pequeno, no hace falta tanto;
export let productos = [
    {id: 1, name: "maceta", price: 500},
    {id: 2, name: "plato", price: 700},
    {id: 3, name: "taza", price: 1200},
    {id: 4, name: "maceta estampada", price: 500},
];

export let pets = [
    {id: 1, name: "tsuna", age: 4},
    {id: 2, name: "michi", age: 2},
    {id: 3, name: "inu", age: 6}
];

import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

console.log(__dirname);


import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


export const uploader = multer( {storage} );