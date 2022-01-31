import { Apple } from "./components/Apple";
import { Score } from "./components/Score";
import { Snake } from "./components/Snake";

const canvas = document.querySelector("canvas");
const width = 600;
const height = 600;
const ctx = canvas.getContext("2d");
const score = Score();

const snakeColor = "#8bc34a";
const appleColor = "#e91e63";
const appleSize = 10;
const snakeSize = 10;
const coeficient = 1.2;

let fps = 50;
let snake;
let apple;
let loop;

const wayRules = {
    "ArrowDown": "down",
    "ArrowLeft": "left",
    "ArrowUp": "up",
    "ArrowRight": "right"
};

document.body.append(score.element);

document.body.addEventListener("keydown", event => {
    if(wayRules[event.code]) {
        snake.setWay(wayRules[event.code]);
    }
});


const clearCanvas = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
};

const game = () => {
    clearCanvas();
    if(!apple?.spawned) {
        apple = Apple({width, height, size: appleSize, color: appleColor, ctx});
        snake.setApple(apple);
    } else {
        apple.draw();
    }
    snake.draw();
    snake.move();
};

const onGrow = () => {
    fps *= coeficient;
    score.setScore(score.getScore() + 1);
    apple.spawned = false;
    if(typeof loop != 'undefined') {
        clearInterval(loop);
        loop = setInterval(game, 1000 / fps);
    }
};

const onDeath = () => {
    score.setScore(0);
    fps = 50;
    clearInterval(loop);
    loop = setInterval(game, 1000 / fps);
};

const play = () => {
    snake = Snake({width, height, size: snakeSize, ctx, color: snakeColor, onGrow, onDeath});
    snake.setWay('right');
    ctx.beginPath();

    if(typeof loop != 'undefined') {
        clearInterval(loop);
        loop = undefined;
    }
    else {
        loop = setInterval(game, 1000 / fps);
    }
}

const playButton = document.createElement("button");
playButton.innerText = "Play";
playButton.addEventListener("click", play);

document.body.append(playButton);

// play();