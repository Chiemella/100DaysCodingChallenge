/* Credit goes to: Johan Karlsson and his Post about Particles in Flowfields:
https://codepen.io/DonKarlssonSan/post/particles-in-simplex-noise-flow-field */

let canvas, ctx, field, w, h, fieldSize, columns, rows, noiseZ, particles, hue;
noiseZ = 0;
emitRate = 20;
emitCount = 20;
particleSize = 1;
fieldSize = 30;
fieldForce = 0.25;
noiseSpeed = 0.0005;
sORp = true;
trailLength = 0.15;
hueBase = 10;
hueRange = 10;
maxSpeed = 3.5;
glow = true;
lifetime = 3000;

class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(Math.random() - 0.5, Math.random() - 0.5);
    this.acc = new Vector(0, 0);
    this.hue = Math.random() * 30 - 15;
    this.lif = Date.now();
    this.dur =
      Math.random() * (lifetime + lifetime / 2 - lifetime / 2) + lifetime / 2;
  }

  move(acc) {
    if (acc) {
      this.acc.addTo(acc);
    }
    this.vel.addTo(this.acc);
    this.pos.addTo(this.vel);
    if (this.vel.getLength() > maxSpeed) {
      this.vel.setLength(maxSpeed);
    }
    this.acc.setLength(0);
  }

  wrap() {
    if (this.pos.x > w) {
      this.pos.x = 0;
    } else if (this.pos.x < -this.fieldSize) {
      this.pos.x = w - 1;
    }
    if (this.pos.y > h) {
      this.pos.y = 0;
    } else if (this.pos.y < -this.fieldSize) {
      this.pos.y = h - 1;
    }
  }
}

canvas = document.querySelector("#canvas");
ctx = canvas.getContext("2d");
reset();
window.addEventListener("resize", reset);

function initParticles() {
  particles = [];
  let numberOfParticles = 1;
  for (let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle(w / 2, h / 2);
    particles.push(particle);
  }
}

function pushParticles() {
  for (var i = 1; i < emitCount; i++) {
    var angle = Math.random() * Math.PI * 2;
    var dist = Math.random() * 20;
    var cx = Math.cos(angle) * dist;
    var cy = Math.sin(angle) * dist;
    let particle = new Particle(w / 2 + cx, h / 2 + cy);
    particles.push(particle);
  }
}

function initField() {
  field = new Array(columns);
  for (let x = 0; x < columns; x++) {
    field[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      let v = new Vector(0, 0);
      field[x][y] = v;
    }
  }
}

function calcField() {
  if (sORp) {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let angle = noise.simplex3(x / 2, y / 2, noiseZ) * Math.PI * 2;
        let length =
          noise.simplex3(x / 40 + 40000, y / 40 + 40000, noiseZ) * fieldForce;
        field[x][y].setLength(length);
        field[x][y].setAngle(angle);
      }
    }
  } else {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let angle = noise.perlin3(x / 2, y / 2, noiseZ) * Math.PI * 2;
        let length =
          noise.perlin3(x / 40 + 40000, y / 40 + 40000, noiseZ) * fieldForce;
        field[x][y].setLength(length);
        field[x][y].setAngle(angle);
      }
    }
  }
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  if (glow) {
    ctx.globalCompositeOperation = "lighter";
  }
  //ctx.strokeStyle = fieldColor;
  noise.seed(Math.random());
  columns = Math.round(w / fieldSize) + 1;
  rows = Math.round(h / fieldSize) + 1;
  initParticles();
  initField();
}

function draw() {
  requestAnimationFrame(draw);
  calcField();
  noiseZ += noiseSpeed;
  drawBackground();
  drawParticles();
}

function drawBackground() {
  if (glow) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, w, h);
  } else {
    ctx.fillStyle = "rgba(0,0,0," + trailLength + ")";
    ctx.fillRect(0, 0, w, h);
  }
}

function drawParticles() {
  particles.forEach((p) => {
    if (p.lif + p.dur < Date.now()) {
      particles.splice(particles.indexOf(p), 1);
    }
    //var ps = p.fieldSize = Math.abs(p.vel.x + p.vel.y)*particleSize + 0.3;
    var pcol =
      "hsl(" +
      (hueBase + p.hue + (p.vel.x + p.vel.y) * hueRange) +
      ", 60%, 80%)";
    ctx.fillStyle = pcol;
    ctx.fillRect(p.pos.x, p.pos.y, particleSize, particleSize);
    let pos = p.pos.div(fieldSize);
    let v;
    if (pos.x >= 0 && pos.x < columns && pos.y >= 0 && pos.y < rows) {
      v = field[Math.floor(pos.x)][Math.floor(pos.y)];
    }
    p.move(v);
    //p.wrap();
  });
}

var emitter = setInterval(pushParticles, emitRate);

draw();
