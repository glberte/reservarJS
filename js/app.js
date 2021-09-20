// Ejercicios

$(document).ready(function(){
  // una vez que el usuario completa los datos necesarios, se habilita los productos

  $("#btnSiguiente").click(function(){
    $("#productos").show(1000);
    $("#detalleProductos").show(1000);
  })
  
  // una vez que el usuario agrega 1 producto, se habilita la opcion de guardar la reserva

  $("#btnAgregarProducto").click(function(){
    $("#btnGuardar").show(1000);
  })

  // Al guardar la reserva, sale la alerta de confirmacion y se oculta todo de nuevo.
  $("#btnGuardar").click(function(){
    $("#productos").hide(1000);
    $("#detalleProductos").hide(1000);
    alert("Se ha guardado la reserva!");
  });


  

}); 
