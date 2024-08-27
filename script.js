document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startButton = document.getElementById('start-button');
    const resultDiv = document.getElementById('result');
    let startTime, reactionTime, totalReactionTime = 0;
    let rounds = 5;
    let roundCount = 0;
    let number4Shown = false;

    function startGame() {
        roundCount = 0;
        totalReactionTime = 0;
        resultDiv.textContent = '';
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
        const randomNum = Math.floor(Math.random() * 9) + 1;
        display.textContent = randomNum;
        
        if (randomNum === 4) {
            number4Shown = true;
            startTime = Date.now();
        } else {
            setTimeout(() => {
                if (!number4Shown) {
                    nextRound();
                }
            }, 1000);
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
        const averageReactionTime = totalReactionTime / rounds;
        resultDiv.textContent = `Tiempo promedio de reacción: ${averageReactionTime.toFixed(2)} ms`;
        display.textContent = '';
    }

    startButton.addEventListener('click', startGame);
});