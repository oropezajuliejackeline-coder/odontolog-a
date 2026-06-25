document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario-contacto");
    const mensajeExito = document.getElementById("mensaje-exito");
    const botonEnviar = document.getElementById("btn-enviar");

    const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbwtob1nUJqF5mxYDDn33jdNVZCgAZjVay0OIHNf0SGlbi4-2JZ7Sj9TUXXIfak8uuPj/exec";

    if (formulario) {
        formulario.addEventListener("submit", function(evento) {
            evento.preventDefault(); 

            
            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            
            if (nombre === "" || correo === "" || mensaje === "") {
                alert("⚠️ Error: Todos los campos del formulario son obligatorios obligatoriamente.");
                return; 
            }

            
            botonEnviar.disabled = true;
            botonEnviar.innerText = "Enviando datos...";

            
            const datosFormulario = new FormData();
            datosFormulario.append("nombre", nombre);
            datosFormulario.append("correo", correo);
            datosFormulario.append("mensaje", mensaje);

            
            fetch(URL_APPS_SCRIPT, {
                method: "POST",
                body: datosFormulario,
                mode: "no-cors" 
            })
            .then(() => {
                
                mensajeExito.style.display = "block"; 
                formulario.reset(); 
                
                
                botonEnviar.disabled = false;
                botonEnviar.innerText = "Enviar Datos";

                
                setTimeout(() => {
                    mensajeExito.style.display = "none";
                }, 5000);
            })
            .catch(error => {
                console.error("Error al enviar los datos:", error);
                alert("Hubo un error al conectar con Google Sheets.");
                botonEnviar.disabled = false;
                botonEnviar.innerText = "Enviar Datos";
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
  const riel = document.getElementById("carrusel-riel");
  const tarjetas = document.querySelectorAll(".carrusel-tarjeta");
  const btnAvanzar = document.getElementById("btn-avanzar");
  const btnRetroceder = document.getElementById("btn-retroceder");

  if (riel && tarjetas.length > 0 && btnAvanzar && btnRetroceder) {
    let posicionActual = 0;
    const tarjetasPorPantalla = 3; 
    const maxPosiciones = tarjetas.length - tarjetasPorPantalla; 

    
    function moverCarrusel() {
      
      const desplazamiento = posicionActual * (100 / tarjetasPorPantalla);
      riel.style.transform = `translateX(-${desplazamiento}%)`;
    }

    
    btnAvanzar.addEventListener("click", function() {
      if (posicionActual < maxPosiciones) {
        posicionActual++; // Avanza a la siguiente foto
      } else {
        posicionActual = 0; 
      }
      moverCarrusel();
    });

    
    btnRetroceder.addEventListener("click", function() {
      if (posicionActual > 0) {
        posicionActual--; 
      } else {
        posicionActual = maxPosiciones; 
      }
      moverCarrusel();
    });
  }
});