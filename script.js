const diceImages = [
    "dice1.png",
    "dice2.png",
    "dice3.png",
    "dice4.png",
    "dice5.png",
    "dice6.png",
];

let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let gameEnded = false;

function updateCurrentPlayerText() {
    document.getElementById("current-player").textContent = `Player ${currentPlayer} to play`;
}

function rollDice() {
    if (gameEnded) return;

    const randomDiceValue = Math.floor(Math.random() * 6) + 1;
    const diceImage = diceImages[randomDiceValue - 1];

    let currentPlayerScore = currentPlayer === 1 ? player1Score : player2Score;
    currentPlayerScore += randomDiceValue;

    if (currentPlayer === 1) {
        player1Score = currentPlayerScore;
        document.getElementById("score1").textContent = `Score: ${player1Score}`;
    } else {
        player2Score = currentPlayerScore;
        document.getElementById("score2").textContent = `Score: ${player2Score}`;
    }

    document.getElementById("currentDice").src = diceImage;

    if (player1Score >= 30 || player2Score >= 30) {
        document.getElementById("rollDice1").disabled = true;
        document.getElementById("rollDice2").disabled = true;
        updateCurrentPlayerText();
        announceWinner();
        gameEnded = true;
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        document.getElementById("rollDice1").disabled = currentPlayer === 2;
        document.getElementById("rollDice2").disabled = currentPlayer === 1;
        updateCurrentPlayerText();
    }
}

function announceWinner() {
    const winner = player1Score >= 30 ? "Player 1" : "Player 2";
    const winnerScore = player1Score >= 30 ? player1Score : player2Score;
    alert(`${winner}\nWinner! Score: ${winnerScore}`);
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    gameEnded = false;
    currentPlayer = Math.random() < 0.5 ? 1 : 2;
    document.getElementById("score1").textContent = "Score: 0";
    document.getElementById("score2").textContent = "Score: 0";
    document.getElementById("currentDice").src = "dice1.png";
    document.getElementById("rollDice1").disabled = false;
    document.getElementById("rollDice2").disabled = true;
    updateCurrentPlayerText();
}

updateCurrentPlayerText();

document.getElementById("rollDice1").addEventListener("click", rollDice);
document.getElementById("rollDice2").addEventListener("click", rollDice);
document.getElementById("reset").addEventListener("click", resetGame);
