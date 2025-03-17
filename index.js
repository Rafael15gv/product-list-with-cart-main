// import { crearTarjeta } from "/modulos/add-comida.js";

fetch("data.json")
.then((Response) => Response.json())
.then((data) => {
  console.log(data); // ver los datos en consola
  console.log(String(data[0].price));
  console.log(data[4].image.mobile);
  
    let divImg = document.querySelectorAll(".card__img");
    let imgCar = document.querySelectorAll(".carrito__img");
    let carTexto = document.querySelectorAll(".carrito__add");
    let carrito__img = document.querySelectorAll(".carrito__img");
    let carrito__add = document.querySelectorAll(".carrito__add");
    let menos = document.querySelectorAll(".menos");
    let conteo = document.querySelectorAll(".conteo");
    let mas = document.querySelectorAll(".mas");
    let btnIndex = document.querySelectorAll(".carrito");
    let suma = document.querySelector("#suma");
    let resta = document.querySelector("#resta");
    let pedido_img = document.querySelector(".pedido__img");
    let pedido_p = document.querySelector(".pedido__p");
    let cantidad_valor = document.querySelectorAll(".nuevoDiv__cantidad");

    let suma_activo = 0;
    let activo = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    activo.forEach((element) => {
      console.log(element);
      suma_activo = suma_activo + element;
    });
    console.log(`la suma de activo es: ${suma_activo}`);

    // SUMAR
    for (let i = 0; i < 9; i++) {
      let masUno = document.querySelectorAll(".mas")[i];
      masUno.addEventListener("click", function (Event) {
        let valorLeido = Number(conteo[i].textContent);

        valorLeido++;
        conteo[i].textContent = valorLeido;
        // document.querySelectorAll(".nuevoDiv__cantidad")[i].textContent = "rafael";
        cantidad_valor[i].textContent = "rafael";
        // cantidad.textContent = valorLeido;
        Event.stopPropagation();
      });
    }

    // RESTA
    for (let i = 0; i < 9; i++) {
      let menosUno = document.querySelectorAll(".menos")[i];
      menosUno.addEventListener("click", function (Event) {
        let valorLeido = Number(conteo[i].textContent);
        valorLeido--;
        conteo[i].textContent = valorLeido;
        if (valorLeido < 1) {
          valorLeido = 1;
          conteo[i].textContent = valorLeido;
          // stilosRiverse(i);
          // activo[i] = 0;
          // newDiv.remove();
          // document.querySelector(".nuevoDiv").remove();
        }
        Event.stopPropagation();
      });
    }

    //BOTON DE CADA PRODUCTO
    for (let i = 0; i < 9; i++) {
      let btn = document.querySelectorAll(".carrito")[i];
      btn.addEventListener("click", function () {
        add(i);
        console.log(`se presiono el producto numero: ${i}`);
        pedido_img.classList.add("hidden");
        pedido_p.classList.add("hidden");

        if (activo[i] == 1) {
          console.log("entramos al return");
          return;
        }

        // crearTarjeta(i);
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

      });
    }

    // FUNCIONES
    function add(index) {
      carrito__img[index].classList.add("hidden");
      carrito__add[index].classList.add("hidden");
      menos[index].classList.remove("hidden");
      conteo[index].classList.remove("hidden");
      mas[index].classList.remove("hidden");

      btnIndex[index].style.backgroundColor = "hsl(14, 86%, 42%)";
      divImg[index].style.border = "2px solid hsl(14, 86%, 42%)";
    }

    function stilosRiverse(index) {
      carrito__img[index].classList.remove("hidden");
      carrito__add[index].classList.remove("hidden");
      menos[index].classList.add("hidden");
      conteo[index].classList.add("hidden");
      mas[index].classList.add("hidden");

      btnIndex[index].style.backgroundColor = "white";
      divImg[index].style.border = "none";
    }

    //   const btn = document.querySelector(".btn");
    //   btn.addEventListener("click", function () {
    //     console.log("entramos");

    //     // CREAR UN DIV EN EL DOM

    //     let padre = document.querySelector(".pedido");

    //     let newDiv = document.createElement("div");
    //     newDiv.setAttribute("class", "nuevoDiv");

    //     let divUno = document.createElement("div");
    //     divUno.setAttribute("class", "divUno");

    //     let divDos = document.createElement("div");
    //     divDos.setAttribute("class", "divDos");

    //     let titulo = document.createElement("P");
    //     titulo.setAttribute("class", "nuevoDiv__titulo");
    //     titulo.textContent = `${data[4].name}`;

    //     let cantidad = document.createElement("P");
    //     cantidad.setAttribute("class", "nuevoDiv__cantidad");
    //     cantidad.textContent = "1x";

    //     let valor = document.createElement("P");
    //     valor.setAttribute("class", "nuevoDiv__valor");
    //     valor.textContent = `$${data[0].price}`;
    //     // valor.textContent = "@ $5.50";

    //     let valor2 = document.createElement("P");
    //     valor2.setAttribute("class", "nuevoDiv__valor2");
    //     valor2.textContent = "$10.50";

    //     let img = document.createElement("img");
    //     img.setAttribute("class", "nuevoDiv__x");

    //     //agregar el div al DOM
    //     padre.appendChild(newDiv);
    //     newDiv.appendChild(divUno);
    //     divUno.appendChild(titulo);
    //     divUno.appendChild(cantidad);
    //     divUno.appendChild(valor);
    //     divUno.appendChild(valor2);
    //     newDiv.appendChild(divDos);
    //     divDos.appendChild(img);

    //   });
  });
