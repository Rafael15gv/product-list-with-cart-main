export function crearTarjeta(i) {
  
  // CREAR UN DIV EN EL DOM
  
let padre = document.querySelector(".pedido");

let newDiv = document.createElement("div");
// newDiv.setAttribute("class", "nuevoDiv");
newDiv.setAttribute("class", `nuevoDiv ${data[i].category}`);

let divUno = document.createElement("div");
divUno.setAttribute("class", "divUno");

let divDos = document.createElement("div");
divDos.setAttribute("class", "divDos");

let titulo = document.createElement("P");
titulo.setAttribute("class", "nuevoDiv__titulo");
titulo.textContent = `${data[i].name}`;

let cantidad = document.createElement("P");
cantidad.setAttribute("class", "nuevoDiv__cantidad");

cantidad.textContent = `${Number(conteo[i].textContent)}x`;
console.log(Number(conteo[i].textContent));
// cantidad.textContent = "1x";

let valor = document.createElement("P");
valor.setAttribute("class", "nuevoDiv__valor");
valor.textContent = `@ $${data[i].price}`;

let valor2 = document.createElement("P");
valor2.setAttribute("class", "nuevoDiv__valor2");
valor2.textContent = "$10.50";

let button = document.createElement("button");
button.setAttribute("class", "nuevoDiv__x");
button.addEventListener("click", function () {
  console.log("ya tiene el evento el boton X");
  stilosRiverse(i);
  newDiv.remove();
  activo[i] = 0;

  activo.forEach((element) => {
    console.log(element);
    suma_activo = suma_activo + element;
  });
  if (suma_activo == 0) {
    pedido_img.classList.remove("hidden");
    pedido_p.classList.remove("hidden");
  }
  console.log(`la suma de activo es: ${suma_activo}`);
  suma_activo = 0;
});

//agregar el div al DOM
padre.appendChild(newDiv);
newDiv.appendChild(divUno);
divUno.appendChild(titulo);
divUno.appendChild(cantidad);
divUno.appendChild(valor);
divUno.appendChild(valor2);
newDiv.appendChild(divDos);
divDos.appendChild(button);

activo[i] = 1;

}