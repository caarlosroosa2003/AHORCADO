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
  palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
  intentos = 6;
  letrasAdivinadas = [];
  palabraMostrada = Array(palabraSeleccionada.length).fill("_");
  document.getElementById("palabra").innerText = palabraMostrada.join(" ");
  document.getElementById("intentosRestantes").innerText = intentos;
  document.getElementById("mensaje").innerText = "";
  document.getElementById("entradaLetra").value = "";
  document.getElementById("botonResetear").style.display = "none";
  actualizarImagenes();
}

// Función que actualiza la interfaz al acertar o fallar la letra
function adivinarLetra() {
  const entradaLetra = document.getElementById("entradaLetra");
  const letra = entradaLetra.value.toUpperCase(); // Convertir la letra ingresada a mayúsculas

  if (!letra || letrasAdivinadas.includes(letra)) {
    document.getElementById("mensaje").innerText =
      "Por favor, introduce una letra válida.";
    return;
  }

  letrasAdivinadas.push(letra);
  entradaLetra.value = "";

  if (palabraSeleccionada.includes(letra)) {
    for (let i = 0; i < palabraSeleccionada.length; i++) {
      if (palabraSeleccionada[i] === letra) {
        palabraMostrada[i] = letra;
      }
    }
  } else {
    intentos--;
  }

  actualizarInterfaz();

  if (intentos === 0) {
    document.getElementById(
      "mensaje"
    ).innerText = `¡Perdiste! La palabra era "${palabraSeleccionada}".`;
    document.getElementById("botonResetear").style.display = "block";
    document.getElementById("botonAdivinar").disabled = true;
  } else if (!palabraMostrada.includes("_")) {
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
  imagen.src = `img/${intentos + 1}.png`;
}

// Evento para cuando clicas en el botón de adivinar letra
document
  .getElementById("botonAdivinar")
  .addEventListener("click", adivinarLetra);

// Iniciar el juego al cargar la página
iniciarJuego();
