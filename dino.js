let tableGame = document.getElementById("table");
let dino = document.getElementById("dino");
let time = 0, seconds = 0, TEN = 10, SIXTY = 60, THOUSAND = 1000;
const jumpDinoHeight = 170;
const moveStep = 10;
let timeInterval = null;
let createCactusInterval = null;
let isGameOver = true;
let isJumping = false;

function increaseTime() {
    ++seconds;
    document.getElementById("timer").innerHTML = "Time: " + seconds + "s";
}

const keyPressed = document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        if(isGameOver) { 
            startGame();
        }
        if(!isJumping) {
            isJumping = true;
            moveDino();
        }        
    }
});

function moveDino() {
    let position = 0;
    let jumpInterval = setInterval(function() {
        position += moveStep;
        if (position === jumpDinoHeight) {
            clearInterval(jumpInterval);
            let downInterval = setInterval(function() {
                position -= moveStep;
                if(position < 0) {
                    position = 0;
                }
                if(position === 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                dino.style.bottom = position + "px";
            }, 20);
        }
        dino.style.bottom = position + "px";        
    }, 20);
}

function startGame() {
    timeInterval = setInterval(increaseTime, 1000);
    createCactusInterval = setInterval(createCactus, 2000);
    isGameOver = false;
    document.getElementById("game-over").innerHTML = "";
}

function createCactus() {
    let cactus = document.createElement("div");
    cactus.classList.add('cactus');
    document.getElementById("table").appendChild(cactus);
    cactus.style.bottom = "0px";
    cactus.style.left = tableGame.offsetWidth + "px";
    moveCactus(cactus);
}

function moveCactus(cactus) {
    const cactusPositionLeft = 5;
    let positionCactus = parseInt(cactus.style.left);
    const cactusInterval = setInterval(function () {
        positionCactus -= cactusPositionLeft;
        cactus.style.left = positionCactus + "px";
        if (positionCactus < 0) {
            clearInterval(cactusInterval); 
            cactus.remove();
        }
        checkCollision(cactus);
    }, 20);  
}

function checkCollision(cactus){
    let dinoPosition = dino.getBoundingClientRect();
    let cactusPosition = cactus.getBoundingClientRect();
    if (dinoPosition.right >= cactusPosition.left && 
        dinoPosition.left <= cactusPosition.right &&
        dinoPosition.bottom >= cactusPosition.top &&
        dinoPosition.top <= cactusPosition.bottom) {
        gameOver();
    }  
}

function gameOver() {
    isGameOver = true;
    clearInterval(timeInterval);
    clearInterval(createCactusInterval);
    createCactusInterval = null;
    document.querySelectorAll(".cactus").forEach((cactus) => {
        cactus.remove();
    });
    document.getElementById("game-over").innerHTML = "Game Over " + seconds + " points";
    seconds = 0;
}