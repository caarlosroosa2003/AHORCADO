// Lista de palabras para adivinar
let words = [
    "PROGRAMACION", "DESARROLLO",
    "ELEFANTE", "DELFIN", "JIRAFA", "MARIPOSA", "CANGURO",
    "PIZZA", "HAMBURGUESA", "TORTILLA", "CHOCOLATE", "ENSALADA",
    "COMPUTADORA", "TELEFONO", "SILLA", "BICICLETA", "LIBRO",
    "PARQUE", "CIUDAD", "PLAYA", "MONTAÑA", "BOSQUE",
    "ROJO", "AZUL", "VERDE", "AMARILLO", "MORADO"
];

// Evento para resetear el juego
document.getElementById('resetButton').addEventListener('click', function() {
    initGame();
    document.getElementById('guessButton').disabled = false;
    document.getElementById('resetButton').style.display = 'none';
});

// Evento para reiniciar el juego estando en mitad de la partida
document.getElementById('restartButton').addEventListener('click', function() {
    initGame();
    document.getElementById('guessButton').disabled = false;
    document.getElementById('resetButton').style.display = 'none';
})

let selectedWord;
let attempts;
let guessedLetters;
let wordDisplay;

// Iniciar el juego
function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    attempts = 6;
    guessedLetters = [];
    wordDisplay = Array(selectedWord.length).fill('_');
    document.getElementById('word').innerText = wordDisplay.join(' ');
    document.getElementById('attempts').innerText = attempts;
    document.getElementById('message').innerText = '';
    document.getElementById('letterInput').value = '';
    document.getElementById('resetButton').style.display = 'none';
    updateImages();
}

// Funcion que en el caso de acertar la letra actualiza la interfaz
// y en el caso de ser erronea la letra resta un intento
function guessLetter() {
    const letterInput = document.getElementById('letterInput');
    const letter = letterInput.value.toUpperCase();  // Convertir la letra ingresada a mayúsculas
    
    if (!letter || guessedLetters.includes(letter)) {
        document.getElementById('message').innerText = 'Por favor, introduce una letra válida.';
        return;
    }
    
    guessedLetters.push(letter);
    letterInput.value = '';
    
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                wordDisplay[i] = letter;
            }
        }
    } else {
        attempts--;
    }
    
    updateDisplay();
    
    if (attempts === 0) {
        document.getElementById('message').innerText = `¡Perdiste! La palabra era "${selectedWord}".`;
        document.getElementById('resetButton').style.display = 'block';
        document.getElementById('guessButton').disabled = true;
    } else if (!wordDisplay.includes('_')) {
        document.getElementById('message').innerText = '¡Ganaste! ¡Felicidades!';
        document.getElementById('resetButton').style.display = 'block';
    }
}

// Actualiza la interfaz
function updateDisplay() {
    document.getElementById('word').innerText = wordDisplay.join(' ');
    document.getElementById('attempts').innerText = attempts;
    document.getElementById('message').innerText = '';
    updateImages();
}

// Actualiza la imagen dependiendo de los intentos que quedan
function updateImages() {
    const image = document.getElementById('person');
    image.src = `img/${attempts + 1}.png`;
}

// Evento para cuando clickes en el boton de adivinar letra en el caso de acertar actualizar la interfaz
// y en el caso de ser erronea la letra restarte un intento
document.getElementById('guessButton').addEventListener('click', guessLetter);

// Iniciar el juego al cargar la página
initGame();
