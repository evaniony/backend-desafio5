const socket = io(); 
//la carpeta public, debe estar dentro de src;

//FRONTEND;
//el front recibe el mensaje; el codigo, debe ser el mismo.
socket.on("code: describe el tipo de mensaje", (msg)=>{
    console.log(msg);
});

socket.emit("desde el front", {
    author: "front",
    msg: "Bienvenido server!"
});