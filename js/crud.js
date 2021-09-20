const formDetalle = document.getElementById('formDetalle');
 
// Tomando los datos del formulario de Items para ver en el detalle
const inputCantidad = document.getElementById("inputCantidad");
const selectDescripcion = document.getElementById('selectDescripcion');
const inputPunitario = document.getElementById('inputPunitario');
const inputPtotal = document.getElementById('inputPtotal');

// Sector para imprimir los elementos en una Tabla para ver el detalle
const cuerpoTabla = document.getElementById('cuerpoTabla');
const btnGuardar = document.getElementById('btnGuardar');
// Tomamos todos los datos para la reserva del formulario superior
const inputNombre = document.getElementById('inputNombre');
const InputDocumento = document.getElementById('InputDocumento');
const inputNro = document.getElementById('inputNro');
const inputTelefono = document.getElementById('inputTelefono');
const inputFecha = document.getElementById('inputFecha');
const inputHora = document.getElementById('inputHora');
const formCabecera = document.getElementById('formCabecera')


// Creando el Array de la reserva completa
let reservas = [];
// Creando el Array contenedor de la tabla detalle
let arregloDetalle = [];

// Creando el Array de los items a ver en la tabla
let arregloProductos = [{id: 1, nombre: "Cancha Tennis 1", precio: 1000},
{id: 2, nombre: "Cancha Tenis 2", precio: 1000},
{id: 3, nombre: "Cancha Tenis 3", precio: 1000},
{id: 4, nombre: "Cancha Tenis 4", precio: 1000},
{id: 5, nombre: "Pelota Penn", precio: 400},
{id: 6, nombre: "Pelota Head", precio: 400},
{id: 7, nombre: "Pelota Penn x 4", precio: 600},
{id: 8, nombre: "Pelota Head x 4", precio: 600},
{id: 9, nombre: "Seña", precio: 300},
{id: 10, nombre: "Pago Total", precio: 0},
];

//funcion para completar la lista de productos, recorremos el array
const llenarProductos = () => {
  arregloProductos.forEach((product) => {
    const opcion = document.createElement("option");
    opcion.value = product.id;
    opcion.innerText = product.nombre;
    selectDescripcion.appendChild(opcion);
  })
}
//llamamos la funcion para activarla
llenarProductos();

// funcion para sacar el nombre del producto por el id y renderizarla en la tablaDetalle
let getNombreProductosByID = (id) => {
  const objProducto = arregloProductos.find((prod) => {
    if(prod.id == +id) {
      return prod;
    }
  });
  return objProducto.nombre; 
}
// funcion para devolver el precio por el id y se autocomplete en inputPunitario del 2do formulario
let getPrecioProductosByID = (id) => {
  const objProducto = arregloProductos.find((prod) => {
    if(prod.id == +id) {
      return prod;
    }
  });
  return objProducto.precio; 
}

// Imprimimos cada producto (array) en la tabla generado de la lista en el detalle con un boton para eliminarlo
const redibujarTabla = () => {
  cuerpoTabla.innerHTML = "";  //correccion para que imprima de a uno.
  arregloDetalle.forEach( (detalle) =>{ 
    // creando la fila con las 4 columnas de la tabla y modificamos el html
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${detalle.cant}</td>
    <td>${detalle.descripcion}</td>
    <td>${detalle.pUnit}</td>
    <td>${detalle.pTotal}</td>`;
    
    // creamos el boton para eliminar cada registro.              
    let tdEliminar = document.createElement(`td`);
    let botonEliminar = document.createElement(`button`);

    //le agregamos clase y color rojo bootstrap
    botonEliminar.classList.add("btn","btn-danger");
    botonEliminar.innerText = `Eliminar`;
    botonEliminar.onclick = () => {
      //console.log(detalle);
      eliminarDetallebyID(detalle.descripcion);
    };
    tdEliminar.appendChild(botonEliminar);
    fila.appendChild(tdEliminar);
    cuerpoTabla.appendChild(fila);
  });
};

// Funcion para eliminar registros de la tabla por el ID se llama desde la creacion forEach en cada item agregado
const eliminarDetallebyID = (id) => {
  arregloDetalle = arregloDetalle.filter((detalle) => {
    if(+id !== +detalle.descripcion){
      return detalle;
    }
  });
  redibujarTabla();
};

// Consolidar los productos cuando se agregan en diferentes momento
const agregarDetalle = (objDetalle) => {
// buscamos si ya existe en el arreglo detalle y los sumamos con la funcion MAP
//console.log(objDetalle);
  const resultado = arregloDetalle.find((detalle)=>{
    if(+objDetalle.descripcion === +detalle.descripcion){
      return detalle;
    }
  });
  // cuando existe el producto en el detalle por el id de la descripcion, aplicamos la sumatoria para consolidarlo
  if (resultado){
    arregloDetalle = arregloDetalle.map((detalle) => {
      if(+detalle.descripcion == +objDetalle.descripcion){
        return{ // aca modificamos el objeto, sumando las cantidades nuevas.
          cant: +detalle.cant + +objDetalle.cant,
          descripcion: detalle.descripcion,
          pTotal: (+detalle.cant + +objDetalle.cant) * +detalle.pUnit,
          pUnit: +detalle.pUnit,
        };
      }
      // si no exite el producto, retornamos el detalle
      return detalle;
    }); // hay que modificar el objeto Detalle que en descripcion esta el ID

  }else{
    
      // mandamos lo seleccionado al objeto
      arregloDetalle.push(objDetalle);

  }

};

formDetalle.onsubmit = (e) => {
  e.preventDefault();

//Creamos el objeto Detalle temporal
  const objDetalle = {
    cant: inputCantidad.value,
    descripcion: selectDescripcion.value,
    pUnit: inputPunitario.value,
    pTotal: inputPtotal.value,
  };
  

  agregarDetalle(objDetalle);

  // llamamos la funcion de imprimir
  redibujarTabla();

};

// Boton guardar, para enviar el array reservar con el subarray arreglo detalle e inviarlo al localstorage.

btnGuardar.onclick = () => {
  // creamos el objeto completo de la reserva
  let ojbReserva = {
    nombre: inputNombre.value,
    documento: InputDocumento.value,
    nro: inputNro.value,
    telefono: inputTelefono.value,
    fehca: inputFecha.value,
    hora: inputHora.value,
    detalle: arregloDetalle,
  };
  //console.log(ojbReserva); 
  reservas.push(ojbReserva);
  // una vez que guardamos la reservar limpiamos los 2 formularios
  formCabecera.reset();
  formDetalle.reset();  // ** REVISAR POR QUE DEJO DE FUNCIONAR **

  // Enviamos la reservar al localStorage
  localStorage.setItem("Reserva", JSON.stringify(reservas));
};

// funcion para autocompletar el precio segun item elegido o al cambiar, y si elegimos el id 0, que ponga valor 0 y al inicio generamos la constante getPrecioProductosById para que se vea en el detalle el nombre y no el id con la propiedad .find
selectDescripcion.onchange = () => {

  if(selectDescripcion.value == "0"){
    formDetalle.reset();
    return;
  }
  
  const precio = getPrecioProductosByID(selectDescripcion.value);
  if(precio){
    inputPunitario.value = precio;
    calcularTotal();
  }
}


// funcion con formula para multplicar cantidad por inputPunitario

const calcularTotal = () => {
  const cantidad = +inputCantidad.value;
  const pUnitario = +inputPunitario.value;
  const pTotal = cantidad * pUnitario;
  inputPtotal.value = pTotal;

};
inputCantidad.onkeyup = () => {
  calcularTotal();
};
inputCantidad.onchange = () => {
  calcularTotal();
}; 
inputPunitario.onchange = () => {
  calcularTotal();
}; 




