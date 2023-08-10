import "./style.css"
type Ball = {
    radius: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number
}

const canvas = document.createElement("canvas")
canvas.width = 800
canvas.height = 600
const context = canvas.getContext("2d")!

const balls: Ball[] = [
    {
        radius: 50,
        x: 400,
        y: 300,
        vx: 5,
        vy: -5,
        fillColor: "red",
        strokeColor: "black",
        strokeWidth: 8
    },
    {
        radius: 20,
        x: 100,
        y: 100,
        vx: 5,
        vy: -5,
        fillColor: "blue",
        strokeColor: "black",
        strokeWidth: 8
    },
    {
        radius: 30,
        x: 200,
        y: 140,
        vx: 5,
        vy: -5,
        fillColor: "yellow",
        strokeColor: "black",
        strokeWidth: 8
    },
    {
        radius: 60,
        x: 170,
        y: 200,
        vx: 5,
        vy: -5,
        fillColor: "orange",
        strokeColor: "black",
        strokeWidth: 8
    }

]

document.querySelector("#box")?.append(canvas)



gameLoop()

function gameLoop() {
    requestAnimationFrame(gameLoop)
    update()
    render()
}

function update() {
    for (let i = 0; i < balls.length; i++) {

        let ball = balls[i]

        ball.x += ball.vx
        ball.y += ball.vy

        // Check right edge collision
        if (ball.x + ball.radius >= canvas.width) {
            ball.vx *= -1
        }

        // Check left edge collision
        if (ball.x < 0 + ball.radius) {
            ball.vx *= -1
        }

        // Check bottom edge collision
        if (ball.y + ball.radius >= canvas.height) {
            ball.vy *= -1
        }

        // Check top edge collision
        if (ball.y < 0 + ball.radius) {
            ball.vy *= -1
        }
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        drawCircle(ball.x, ball.y, ball.radius, ball.fillColor, ball.strokeColor, ball.strokeWidth)
    }

}

function drawCircle(x: number, y: number, radius: number, fillColor: string, strokeColor: string, strokeWidth: number) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2) // x value, y value, radius of the circle, start angle, end angle

    context.fillStyle = fillColor
    context.fill()

    context.lineWidth = strokeWidth
    context.strokeStyle = strokeColor
    context.stroke()
}