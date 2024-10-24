// Lista de palabras para adivinar
let palabras = [
    "PROGRAMACION", "DESARROLLO",
    "ELEFANTE", "DELFIN", "JIRAFA", "MARIPOSA", "CANGURO",
    "PIZZA", "HAMBURGUESA", "TORTILLA", "CHOCOLATE", "ENSALADA",
    "COMPUTADORA", "TELEFONO", "SILLA", "BICICLETA", "LIBRO",
    "PARQUE", "CIUDAD", "PLAYA", "MONTAÑA", "BOSQUE",
    "ROJO", "AZUL", "VERDE", "AMARILLO", "MORADO"
];

// Evento para resetear el juego
document.getElementById('botonResetear').addEventListener('click', function() {
    iniciarJuego();
    document.getElementById('botonAdivinar').disabled = false;
    document.getElementById('botonResetear').style.display = 'none';
});

// Evento para reiniciar el juego durante la partida
document.getElementById('botonReiniciar').addEventListener('click', function() {
    iniciarJuego();
    document.getElementById('botonAdivinar').disabled = false;
    document.getElementById('botonResetear').style.display = 'none';
})

let palabraSeleccionada;
let intentos;
let letrasAdivinadas;
let palabraMostrada;

// Iniciar el juego
function iniciarJuego() {
  // Selecciona una palabra aleatoria de la lista
  palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
  
  // Inicializa el número de intentos a 6
  intentos = 6;
  
  // Crea un array vacío para almacenar las letras que el jugador adivina
  letrasAdivinadas = [];
  
  // Inicializa la palabra mostrada con guiones bajos, uno por cada letra de la palabra seleccionada
  palabraMostrada = Array(palabraSeleccionada.length).fill("_");
  
  // Actualiza el elemento HTML para mostrar la palabra con los guiones bajos
  document.getElementById("palabra").innerText = palabraMostrada.join(" ");

  // Muestra la cantidad de intentos restantes
  document.getElementById("intentosRestantes").innerText = intentos;
  // Limpia el mensaje de error o de haber ganado
  document.getElementById("mensaje").innerText = "";
  document.getElementById("entradaLetra").value = "";
  document.getElementById("botonResetear").style.display = "none";
  
  // Llama a la función que actualiza la imagen del ahorcado
  actualizarImagenes();
}

// Función que se ejecuta al intentar adivinar una letra
function adivinarLetra() {
  const entradaLetra = document.getElementById("entradaLetra");
  
  const letra = entradaLetra.value.toUpperCase(); 

  // Verifica si no se ha ingresado letra o si ya se puso anteriormente
  if (!letra || letrasAdivinadas.includes(letra)) {
    document.getElementById("mensaje").innerText =
      "Por favor, introduce una letra válida.";
    return;
  }

  // Añade la letra a la lista y limpia el input
  letrasAdivinadas.push(letra);
  entradaLetra.value = "";

  // Verifica si la letra está en la palabra seleccionada
  if (palabraSeleccionada.includes(letra)) {
    // Si la letra está en la palabra, actualiza 'palabraMostrada' con esa letra en las posiciones correctas
    for (let i = 0; i < palabraSeleccionada.length; i++) {
      if (palabraSeleccionada[i] === letra) {
        palabraMostrada[i] = letra;
      }
    }
  } else {
    intentos--;
  }

  // Actualiza la interfaz
  actualizarInterfaz();

  if (intentos === 0) {
    // Si los intentos es igual a 0, el jugador pierde
    document.getElementById(
      "mensaje"
    ).innerText = `¡Perdiste! La palabra era "${palabraSeleccionada}".`;
    document.getElementById("botonResetear").style.display = "block";
    document.getElementById("botonAdivinar").disabled = true;
  } else if (!palabraMostrada.includes("_")) {
    // Si no hay más barra baja, el jugador ha ganado
    document.getElementById("mensaje").innerText = "¡Ganaste! ¡Felicidades!";
    document.getElementById("botonResetear").style.display = "block";
  }
}

// Actualiza la interfaz
function actualizarInterfaz() {
  document.getElementById("palabra").innerText = palabraMostrada.join(" ");
  document.getElementById("intentosRestantes").innerText = intentos;
  document.getElementById("mensaje").innerText = "";
  actualizarImagenes();
}

// Actualiza la imagen dependiendo de los intentos que quedan
function actualizarImagenes() {
  const imagen = document.getElementById("imagenAhorcado");
  imagen.src = `IMG/${intentos + 1}.png`;
}

// Evento para cuando clicas en el botón de adivinar letra
document
  .getElementById("botonAdivinar")
  .addEventListener("click", adivinarLetra);

// Iniciar el juego al cargar la página
iniciarJuego();
