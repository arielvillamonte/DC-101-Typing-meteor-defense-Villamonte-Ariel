// Simple word list
const words = ["html", "css", "javascript", "code", "game", "web"];

const gameArea = document.getElementById("gameArea");
const input = document.getElementById("wordInput");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

let score = 0;
let lives = 3;
let currentWord = "";
let meteor;
let fallInterval;

// Create a new meteor
function spawnMeteor() {
    meteor = document.createElement("div");
    meteor.classList.add("meteor");

    currentWord = words[Math.floor(Math.random() * words.length)];
    meteor.textContent = currentWord;

    meteor.style.left = Math.random() * 80 + "%";
    gameArea.appendChild(meteor);

    let top = 0;

    fallInterval = setInterval(() => {
        top += 2;
        meteor.style.top = top + "px";

        if (top > gameArea.offsetHeight - 30) {
            clearInterval(fallInterval);
            gameArea.removeChild(meteor);
            loseLife();
        }
    }, 50);
}

// Lose life
function loseLife() {
    lives--;
    livesDisplay.textContent = lives;

    if (lives === 0) {
        alert("Game Over! Your score: " + score);
        location.reload();
    } else {
        spawnMeteor();
    }
}

// Check typed word
input.addEventListener("input", () => {
    if (input.value === currentWord) {
        clearInterval(fallInterval);
        gameArea.removeChild(meteor);
        score++;
        scoreDisplay.textContent = score;
        input.value = "";
        spawnMeteor();
    }
});

// Start game
spawnMeteor();