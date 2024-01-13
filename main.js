const productos = [
    {
      id: 1,  
      nombre: "guitarra electrica",
      precio: 600,
      imagen: "./img/guitarraElectrica.jpg"
    },
    {
      id: 2,  
      nombre: "guitarra criolla",
      precio: 500,
      imagen: "./img/guitarraCriolla.jpg"
    },
    {
        id: 3,  
      nombre: "guitarra acústica",
      precio: 550,
      imagen: "./img/guitarraAcustica.jpg"
    },
    {
        id: 4,  
      nombre: "bajo eléctrico",
      precio: 580,
      imagen: "./img/bajoElectrico.jpg"
    },
    {
        id: 5,  
      nombre: "micrófono",
      precio: 350,
      imagen: "./img/microfono.jpg"
    },
    {
        id: 6,  
      nombre: "batería",
      precio: 750,
      imagen: "./img/bateria.jpg"
    },
    {
        id: 7,  
      nombre: "teclado",
      precio: 650,
      imagen: "./img/pianoElectrico.jpg"
    },
  ];


productos.forEach((item) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <div class="card" style="width: 18rem; text-align: center;">
            <img src="${item.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">$${item.precio}</p>
            <button id="boton${item.id}" class="btn btn-primary">Comprar</button>
            </div>
            </div>
        `;
        document.body.append(div);

        let boton = document.getElementById(`boton${item.id}`);
        boton.addEventListener("click", () => agregar(item.id));
})


JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]));

let carrito = JSON.parse(sessionStorage.getItem("carrito"));
let divCarrito = document.createElement("div");

const mostrarCarrito = () => {
  divCarrito.innerHTML = ``;
    carrito.forEach((producto) => {
      divCarrito.innerHTML += `
      <table class="table table-striped">
      <tbody>
        <tr>
          <th scope="row">Producto: ${producto.nombre}</th>
          <td>Precio unitario: $${producto.precio}</td>
          <td>Cantidad: ${producto.cantidad}</td>
          <td>Precio total: $${producto.precio * producto.cantidad} </td>
        </tr>
      `;
      document.body.append(divCarrito);
      })
    }

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

  alert(`Usted compró el producto ${producto.nombre}`)
  console.log(carrito)
  mostrarCarrito()
};





