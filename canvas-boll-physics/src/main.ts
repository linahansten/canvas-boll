import { distance, handleCircleCollision } from './physics';
import { randomFloat, randomInt } from './random';
import './style.css';

type Ball = {
  radius: number,
  x: number,
  y: number,
  vx: number,
  vy: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number
};

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d')!;
document.querySelector('#app')!.append(canvas);
canvas.addEventListener('pointerdown', onMouseDown);

const balls: Ball[] = [
  {
    radius: 90,
    x: 100,
    y: 100,
    vx: -3,
    vy: 10,
    fillColor: 'cyan',
    strokeColor: 'purple',
    strokeWidth: 8
  },
  {
    radius: 20,
    x: canvas.width-100,
    y: 100,
    vx: 3,
    vy: -4,
    fillColor: 'cyan',
    strokeColor: 'purple',
    strokeWidth: 8
  },
  {
    radius: 40,
    x: canvas.width-100,
    y: canvas.height-100,
    vx: 7,
    vy: 11,
    fillColor: 'cyan',
    strokeColor: 'purple',
    strokeWidth: 8
  },
  {
    radius: 50,
    x: 100,
    y: canvas.height-100,
    vx: -7,
    vy: 2,
    fillColor: 'cyan',
    strokeColor: 'purple',
    strokeWidth: 8
  }
];

gameLoop();

function onMouseDown(e: PointerEvent) {

  for(let i = balls.length - 1; i >= 0; i--) {
    const d = distance(balls[i], {x: e.offsetX, y: e.offsetY});
    // Remove ball
    if(d < balls[i].radius) {
      balls.splice(i, 1);
      return;
    }
  }

  // Add new ball
  balls.push({
    radius: randomInt(20, 60),
    x: e.offsetX,
    y: e.offsetY,
    vx: randomFloat(-10, 10),
    vy: randomFloat(-10, 10),
    fillColor: 'red',
    strokeColor: 'maroon',
    strokeWidth: 8
  });
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  update();
  render();
}

function update() {
  for(let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    ball.x += ball.vx;
    ball.y += ball.vy;

    // Check right edge collision
    if(ball.x + ball.radius >= canvas.width) {
      ball.vx = -ball.vx;
      ball.x = canvas.width - ball.radius;
    }

    // Check left edge collision
    if(ball.x - ball.radius <= 0) {
      ball.vx = -ball.vx;
      ball.x = ball.radius;
    }

    // Check top edge collision
    if(ball.y -ball.radius <= 0) {
      ball.vy = -ball.vy;
      ball.y = ball.radius;
    }

    // Check bottom edge collision
    if(ball.y + ball.radius >= canvas.height) {
      ball.vy = -ball.vy;
      ball.y = canvas.height - ball.radius;
    }

    for(let j = i + 1; j < balls.length; j++) {
      handleCircleCollision(ball, balls[j]);
    }
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    drawCircle(ball.x, ball.y, ball.radius, ball.fillColor, ball.strokeColor, ball.strokeWidth);
  };

}

function drawCircle(x: number, y: number, radius: number, fillColor: string, strokeColor: string, strokeWidth: number) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);

  context.fillStyle = fillColor;
  context.fill();

  context.lineWidth = strokeWidth;
  context.strokeStyle = strokeColor;
  context.stroke();
}
