let currentWay = "right";
let apple;
let parts = 5;

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

    const move = way => {
        let head = body[body.length - 1];
        let x = head.x;
        let y = head.y;

        way = validateWay(way)? way : currentWay;

        switch (way) {
            case "right":
                x = increment({limit: width, step: size, body: x});
                break;
            case "down":
                y = increment({limit: height, step: size, body: y});
                break;
            case "left":
                x = decrement({limit: width, step: size, body: x});
                break;
            case "up":
                y = decrement({limit: height, step: size, body: y});
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
            currentWay = way;
            body.push({x, y});
            if(apple) {
                if((-5 <= x - apple.x && x - apple.x <= 5) && (-5 <= y - apple.y && y - apple.y <= 5)) {
                    grow();
                    if(onGrow) onGrow();
                    apple.spawned = false;
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
        parts += 5;
    };

    const setWay = way => {
        currentWay = validateWay(way)? way : currentWay;
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