const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = {
  x: 150,
  y: 200,
  radius: 10,
  vx: 0,
  vy: 0
};

window.addEventListener("deviceorientation", (event) => {
  // ガンマ: 左右の傾き (-90～90)
  // ベータ: 前後の傾き (-180～180)
  const gamma = event.gamma;
  const beta = event.beta;

  // 簡単な物理: 傾きに応じて速度を変える
  ball.vx += gamma * 0.05;
  ball.vy += beta * 0.05;
});

function update() {
  // 位置更新
  ball.x += ball.vx;
  ball.y += ball.vy;

  // 壁にぶつかったら跳ね返す
  if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
    ball.vx *= -0.8;
    ball.x = Math.max(ball.radius, Math.min(ball.x, canvas.width - ball.radius));
  }
  if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
    ball.vy *= -0.8;
    ball.y = Math.max(ball.radius, Math.min(ball.y, canvas.height - ball.radius));
  }

  // 摩擦
  ball.vx *= 0.98;
  ball.vy *= 0.98;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
