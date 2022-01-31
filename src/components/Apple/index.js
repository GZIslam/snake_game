export const Apple = ({width, height, size, ctx, color}) => {
    let x = Math.floor(Math.random() * (width - size));
    let y = Math.floor(Math.random() * (height - size));
    x = x - (x % 10);
    y = y - (y % 10);
    let spawned = true;

    let draw = () => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);	
    }

    return { x, y, draw, spawned }
}