let particles = []

let amountParticles = 600

let dia = 5
let explosion = 5
let distanceMouse = 75
let fleeMult = 3
let arriveMult = 1



function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  //Make the particles
  for (let i = 0; i < amountParticles; i++)
    // particles[i] = new Particle(round(random(0, 400/dia)) * dia, round(random(0, 400/dia)) * dia);
    particles[i] = new Particle(random(0, width), random(0, height));
}

// function mouseDragged() {
//   for (let i = 0; i < amountParticles; i++) {
//     p[i]= new Particle(mouseX, mouseY, 3, 0, 3/speedParticles);
//     for(let par of p) 
//       particles.push(par)
//   }
// }

function draw() {
  background(45);

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].move();
    particles[i].behaviors();

  }
}

class Particle {
  constructor(_x, _y) {
    //values particles
    this.pos = createVector(_x, _y)
    this.target = createVector(random(0, width), random(0, height))
    this.vel = p5.Vector.random2D() //createVector()
    this.acc = createVector()
    this.maxSpeed = 5
    this.maxForce = 0.3
    this.c = map(this.pos.x, 0, width, 0, 360)
  }


  behaviors() {
    var arrive = this.arrive(this.target)
    let mouse = createVector(mouseX, mouseY)
    let flee = this.flee(mouse)

    arrive.mult(arriveMult)
    flee.mult(fleeMult)
    
    this.applyForce(arrive)
    this.applyForce(flee)
  }


  applyForce(force) {
    this.acc.add(force)
  }


  move() {
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)

  }


  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos)
    let d = desired.mag()
    var speed = this.maxSpeed

    if (d < distanceMouse) {
      speed = map(d, 0, distanceMouse, 0, this.maxSpeed)
    }

    desired.setMag(speed)
    let steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    return steer;
  }


  flee(target) {
    let desired = p5.Vector.sub(target, this.pos)
    let d = desired.mag()

    if (d < distanceMouse) {
      desired.setMag(this.maxSpeed)
      if (mouseIsPressed) {
        if (mouseButton === LEFT) {
          desired.mult(-explosion)
        }
      }

      let steer = p5.Vector.sub(desired, this.vel)
      steer.limit(this.maxForce)
      return steer;
    } else {
      return createVector(0, 0)
    }
  }


  show() {
    colorMode(HSL, 360);
    noStroke();
    fill(this.c, 200, 200);
    circle(this.pos.x, this.pos.y, dia)
  }


  collision() {}
}