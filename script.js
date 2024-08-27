document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startButton = document.getElementById('start-button');
    const resultDiv = document.getElementById('result');
    let startTime, reactionTime, totalReactionTime = 0;
    let rounds = 3; // Número de rondas
    let roundCount = 0;
    let number4Shown = false;
    let isGameActive = false;

    function startGame() {
        if (isGameActive) return; // Evita iniciar el juego si ya está activo

        roundCount = 0;
        totalReactionTime = 0;
        resultDiv.textContent = '';
        isGameActive = true;
        nextRound();
    }

    function nextRound() {
        if (roundCount < rounds) {
            roundCount++;
            number4Shown = false;
            setTimeout(() => {
                displayNumber();
            }, Math.random() * 2000 + 1000); // Espera entre 1 y 3 segundos
        } else {
            endGame();
        }
    }

    function displayNumber() {
        const randomNum = Math.random() < 0.5 ? Math.floor(Math.random() * 90) + 10 : 4;
        display.textContent = randomNum;
        
        if (randomNum === 4) {
            number4Shown = true;
            startTime = Date.now();
        } else {
            setTimeout(() => {
                if (!number4Shown) {
                    nextRound();
                }
            }, 1000); // Espera un segundo antes de mostrar el siguiente número
        }
    }

    display.addEventListener('click', () => {
        if (number4Shown) {
            reactionTime = Date.now() - startTime;
            totalReactionTime += reactionTime;
            display.textContent = '¡Bien hecho!';
            setTimeout(nextRound, 1000);
        }
    });

    function endGame() {
        isGameActive = false;
        const averageReactionTime = totalReactionTime / rounds;
        resultDiv.textContent = `Tiempo promedio de reacción: ${averageReactionTime.toFixed(2)} ms`;
        display.textContent = '';
    }

    startButton.addEventListener('click', startGame);
});