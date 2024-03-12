fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const productos = data;

const categorias = [];
let containerProductos = document.getElementById("productos");
let containerCarrito = document.getElementById("containerCarrito");

productos.forEach((producto) => {
    if (!categorias.includes(producto.categoria)) {
        categorias.push(producto.categoria);
    }
});

categorias.forEach((categoria) => {
    let divCategoria = document.createElement("div");
    divCategoria.innerHTML = `<h2>${categoria}</h2>`;
    divCategoria.setAttribute(`id`, `${categoria}`);
    divCategoria.classList.add(`row`, 'mb-4');
    divCategoria.style.justifyContent = "center";
    containerProductos.append(divCategoria);

    const productosCategoria = productos.filter((producto) => producto.categoria === categoria);
    productosCategoria.forEach((item) => {
        let divProducto = document.createElement("div");
        divProducto.classList.add(`col-lg-4`);
        divProducto.innerHTML = `
        <div class="card" style="margin-bottom: 2rem;"> 
        <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}" style="padding: 1rem;">
        <div class="card-body" style="margin: 0 auto;">
        <h5 class="card-title" >${item.nombre}</h5>
        <p class="card-text" >$${item.precio}</p>
        <p class="card-text" >${item.texto}</p>
        <button type="button" class="btn btn-danger btn-buscar" id="boton${item.id}">Comprar</button>
        </div>
        </div>
        `;
        divCategoria.append(divProducto);
        let boton = document.getElementById(`boton${item.id}`);
        boton.addEventListener("click", () => {
        agregar(item.id);
          Swal.fire({
          text: `Se ha agregado ${item.nombre} al carrito`,
          icon: "success",
        });
        let card = boton.closest('.card');
        card.classList.add(`colorComprar`)
        setTimeout(() => {
          card.classList.remove('colorComprar')
      }, 3000)
      });
  });
});

const agregar = (id) => {
  let producto = productos.find((item) => item.id === id);
  const productoCarrito = carrito.find((item) => item.id === id)
  if(productoCarrito === undefined){
    const nuevoProductoCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    }
    carrito.push(nuevoProductoCarrito);
  
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
  }else{
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    carrito[indexProductoCarrito].cantidad++
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
  }
  carrito = JSON.parse(sessionStorage.getItem("carrito"))
  mostrarCarrito()
  };

  function normalize(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    let search = document.getElementById("search");
    let botonSearch = document.getElementById("botonSearch");
    search.addEventListener("input", () => {
      event.preventDefault();
      if (search.value === "") {
        window.location.reload(); 
        return;
    }
    let resultadoBusqueda = productos.filter((el) =>
    normalize(el.nombre.toLowerCase()).includes(normalize(search.value.toLowerCase()))
    );
    containerProductos.innerHTML = "";
    containerProductos.classList.add(`row`);
    containerProductos.style.justifyContent = "center";
    resultadoBusqueda.forEach((item) => {
      let divBusqueda = document.createElement("div");
      divBusqueda.classList.add(`col-lg-4`);
      divBusqueda.innerHTML = `
        <div class="card" style="margin-top: 2rem; margin-bottom: 2rem;"> 
          <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
          <div class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">$${item.precio}</p>
            <p class="card-text">${item.texto}</p>
            <button type="button" class="btn btn-danger btn-buscar" id="boton${item.id}">Comprar</button>
          </div>
        </div>
      `;
      containerProductos.append(divBusqueda);
    
    let boton = document.getElementById(`boton${item.id}`);
    boton.addEventListener("click", () => {
    agregar(item.id);
      Swal.fire({
      text: `Se ha agregado ${item.nombre} al carrito`,
      icon: "success",
    });
    });
    });
    let carrouselCategorias = document.getElementById("carouselExampleCaptions");
    carrouselCategorias.style.display = "none";
    })

    botonSearch.addEventListener("click", () => {
    event.preventDefault();
    let resultadoBusqueda = productos.filter((el) =>
    normalize(el.nombre.toLowerCase()).includes(normalize(search.value.toLowerCase()))
    );
    containerProductos.innerHTML = "";
    containerProductos.classList.add(`row`);
    containerProductos.style.justifyContent = "center";
    resultadoBusqueda.forEach((item) => {
      let divBusqueda = document.createElement("div");
      divBusqueda.classList.add(`col-lg-4`);
      divBusqueda.innerHTML = `
        <div class="card" style="margin-top: 2rem; margin-bottom: 2rem;"> 
          <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
          <div class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">$${item.precio}</p>
            <p class="card-text">${item.texto}</p>
            <button type="button" class="btn btn-danger" id="boton${item.id}" >Comprar</button>
          </div>
        </div>
      `;
      containerProductos.append(divBusqueda);
    
    let boton = document.getElementById(`boton${item.id}`);
    boton.addEventListener("click", () => {
    agregar(item.id);
      Swal.fire({
      text: `Se ha agregado ${item.nombre} al carrito`,
      icon: "success",
    });
    });
    });
    let carrouselCategorias = document.getElementById("carouselExampleCaptions");
    carrouselCategorias.style.display = "none";
    });

})

.catch(error => console.error('Error al cargar el archivo JSON:', error));

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]));

let carrito = JSON.parse(sessionStorage.getItem("carrito"));
let divCarrito = document.createElement("div");

const vaciarCarrito = () => {
  carrito.forEach((producto) => {
    producto.cantidad = 0;
  });
  let totalCarrito = 0;
  carrito = [];
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  Toastify({
    text: "Se ha vaciado el carrito correctamente.",
    duration: 3000
    }).showToast();
  };

const restarProducto = (id) => {
  const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id);
  if (carrito[indexProductoCarrito].cantidad > 1) {
    carrito[indexProductoCarrito].cantidad--;
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    Toastify({
      text: `Se ha quitado un ${carrito[indexProductoCarrito].nombre} del carrito.`,
      duration: 3000
      }).showToast();
  } else {
    carrito.splice(indexProductoCarrito, 1);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    Toastify({
      text: `Se ha quitado ${carrito[indexProductoCarrito].nombre} del carrito.`,
      duration: 3000
      }).showToast();
  }
};

const sumarProducto = (id) => {
  const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id);
  carrito[indexProductoCarrito].cantidad++;
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  Swal.fire({
    text: `Se ha agregado un ${carrito[indexProductoCarrito].nombre} al carrito`,
    icon: "success",
  });
};

const mostrarCarrito = () => {
divCarrito.innerHTML = ``;
let totalCarrito = 0; 

carrito.forEach((producto) => {
  const precioTotal = producto.precio * producto.cantidad;
  totalCarrito += precioTotal; 

  divCarrito.innerHTML += `
    <table class="table table-striped" id="tablaCarrito" style="width: 70%; margin: 0 auto">
      <tbody>
        <tr>
          <th scope="row">Producto: ${producto.nombre}</th>
          <td style="width: 20%;">Precio unitario: $${producto.precio}</td>
          <td style="width: 12%;">Cantidad: ${producto.cantidad}</td>
          <td style="width: 12%;">Precio total: $${precioTotal}</td>
          <td style="width: 5%;"><button id="restar${producto.id}" onclick="restarProducto(${producto.id})">-</button></td>
          <td style="width: 5%;"><button id="sumar${producto.id}" onclick="sumarProducto(${producto.id})">+</button></td>
        </tr>
      </tbody>
    </table>`;
});

divCarrito.innerHTML += `
  <table class="table table-striped" style="width: 70%; margin: 0 auto; margin-bottom: 10px;">
    <tbody>
      <tr>
        <th scope="row" style="text-align: center;">Precio total del carrito: $${totalCarrito}</th>
        <td><button id="vaciarCarrito" onclick="vaciarCarrito()">Vaciar carrito</button></td>
      </tr>
    </tbody>
  </table>`;

containerCarrito.append(divCarrito);

};

carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
mostrarCarrito();









