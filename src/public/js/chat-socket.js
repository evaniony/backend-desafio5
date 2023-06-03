const socket = io(); 
//la carpeta public, debe estar dentro de src;

//uso de sweetAlert;
let nombre = "";
async function asyncWraper() {
    const { value: nombreIngresado } = await Swal.fire({
      title: "Ingresa tu nombre",
      input: "text",
      inputLabel: "Tu nombre",
      inputValue: "",
      showCancelButton: false,
      allowOutsideButton: false,
      inputValidator: (value) => {
        if (!value) {
          return "Por favor completar";
        }
      },
    });
    nombre = nombreIngresado;
    document.getElementById("span-nombre").innerHTML = nombre;
  }




//const chatBox = document.getElementById("input-msg");
//cada vez que toca una letra...
//y tomo ese evento, ese valor de tecla;
const formBox = document.getElementById("form");
const inputTitle = document.getElementById("input-title");
const inputPrice = document.getElementById("input-price");
const inputDescription = document.getElementById("input-description");

/* chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      msg: chatBox.value,
      user: nombre,
    });
    chatBox.value = "";
  }
}); */

formBox.addEventListener("click", (e) =>{
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    price: inputPrice.value,
    description: inputDescription.value
  };
  socket.emit("generate-prod", newProduct);
  formBox.value = "";
})

socket.on("todos_los_productos", (products) =>{
    const divMsgs = document.getElementById("div-msgs");
    let contenido = "";
    products.forEach(prod => {
        contenido = contenido +`<p> se agrega: ${prod.title}, ${prod.price}, ${prod.description}</p>${contenido}`;
    });
    divMsgs.innerHTML = contenido;
})
//FRONTEND;
//el front recibe el mensaje; el codigo, debe ser el mismo.
/* socket.on("code: describe el tipo de mensaje", (msg)=>{
    console.log(msg);
});

socket.emit("desde el front", {
    author: nombre,
    msg: "Bienvenido server!"
});
 */
asyncWraper();