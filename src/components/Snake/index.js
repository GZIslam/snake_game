let currentWay = "right";
let way = currentWay;
let apple;
let parts = 10;
let growCount = 20;

const appleEatSound = new Audio("./assets/sounds/apple_eat.wav");
const gameOverSound = new Audio("./assets/sounds/game_over.wav");

const validateWay = way => {
    let isValid = false;
    switch (way) {
        case "right":
            currentWay !== "left"? isValid = true : isValid = false;
            break;
        case "down":
            currentWay !== "up"? isValid = true : isValid = false;
            break;
        case "left":
            currentWay !== "right"? isValid = true : isValid = false;
            break;
        case "up":
            currentWay !== "down"? isValid = true : isValid = false;
            break;
    }
    return isValid;
};

const increment = ({limit, step, body}) => {
    if(limit >= body + step) {
        return body + step;
    } else {
        return 0;
    }
};

const decrement = ({limit, step, body}) => {
    if(body - step >= 0) {
        return body - step;
    } else {
        return limit;
    }
};

export const Snake = ({ width, height, size, ctx, color, onGrow, onDeath }) => {
    let body = [
        {
            x: Math.floor(width / 2),
            y: Math.floor(height / 2),
        }
    ];

    const move = () => {
        let head = body[body.length - 1];
        let x = head.x;
        let y = head.y;

        if((x % 10 === 0) && (y % 10 === 0) && validateWay(way)) {
            currentWay = way;
        }

        switch (currentWay) {
            case "right":
                x = increment({limit: width, step: 1, body: x});
                break;
            case "down":
                y = increment({limit: height, step: 1, body: y});
                break;
            case "left":
                x = decrement({limit: width, step: 1, body: x});
                break;
            case "up":
                y = decrement({limit: height, step: 1, body: y});
        }

        if(body.find(part => part.x === x && part.y === y) !== undefined) { // body.reduce((acc, item) => {if(item.x === x && item.y === y) acc = true;}, false)
            gameOverSound.play();
            parts = 10;
            if(onDeath) onDeath();
            body = [
                {
                    x: Math.floor(width / 2),
                    y: Math.floor(height / 2),
                }
            ]
        } else {
            body.push({x, y});
            if(apple) {
                if(x === apple.x && y === apple.y) {
                    grow();
                    if(onGrow) onGrow();
                }
            }
            if(parts > 0) {
                parts--;
            } else {
                body.splice(0, 1);
            }
        }
    };

    const grow = () => {
        appleEatSound.play();
        parts += growCount;
    };

    const setWay = val => {
        way = validateWay(val)? val : currentWay;
    }

    const draw = () => {
        body.forEach(part => {
            ctx.fillStyle = color;
            ctx.fillRect(part.x, part.y, size, size);	
        });
    };

    const setApple = value => apple = value;

    return { body, move, grow, draw, setWay, setApple }
}