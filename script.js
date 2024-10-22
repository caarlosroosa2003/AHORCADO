let words = [
    "PROGRAMACION", "DESARROLLO",
    "ELEFANTE", "DELFIN", "JIRAFA", "MARIPOSA", "CANGURO",
    "PIZZA", "HAMBURGUESA", "TORTILLA", "CHOCOLATE", "ENSALADA",
    "COMPUTADORA", "TELEFONO", "SILLA", "BICICLETA", "LIBRO",
    "PARQUE", "CIUDAD", "PLAYA", "MONTAÑA", "BOSQUE",
    "ROJO", "AZUL", "VERDE", "AMARILLO", "MORADO"
];

document.getElementById('resetButton').addEventListener('click', function() {
    initGame();
    document.getElementById('guessButton').disabled = false;
    document.getElementById('resetButton').style.display = 'none';
});

document.getElementById('restartButton').addEventListener('click', function() {
    initGame();
    document.getElementById('guessButton').disabled = false;
    document.getElementById('resetButton').style.display = 'none';
})

let selectedWord;
let attempts;
let guessedLetters;
let wordDisplay;

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

function updateDisplay() {
    document.getElementById('word').innerText = wordDisplay.join(' ');
    document.getElementById('attempts').innerText = attempts;
    document.getElementById('message').innerText = '';
    updateImages();
}

function updateImages() {
    const image = document.getElementById('person');
    image.src = `img/${attempts + 1}.png`;
}

document.getElementById('guessButton').addEventListener('click', guessLetter);
document.getElementById('resetButton').addEventListener('click', initGame);

// Iniciar el juego al cargar la página
initGame();
