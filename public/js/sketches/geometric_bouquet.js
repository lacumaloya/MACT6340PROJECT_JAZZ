let flowers = [];
let numFlowers = 7;
let time = 0;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 1);
  
  // Create initial flowers
  for (let i = 0; i < numFlowers; i++) {
    flowers.push(new Flower(
      random(width * 0.2, width * 0.8),
      random(height * 0.2, height * 0.8),
      random(30, 60),
      color(random(0, 60), 80, 90) // Warm colors
    ));
  }
  
  frameRate(30);
}

function draw() {
  background(210, 10, 95); // Light blue background
  
  // Draw vase
  fill(200, 30, 80);
  noStroke();
  beginShape();
  vertex(width * 0.4, height * 0.7);
  vertex(width * 0.6, height * 0.7);
  vertex(width * 0.65, height * 0.9);
  vertex(width * 0.35, height * 0.9);
  endShape(CLOSE);
  
  // Update and draw flowers
  for (let flower of flowers) {
    flower.update();
    flower.display();
  }
  
  time += 0.02;
}

class Flower {
  constructor(x, y, size, col) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
    this.petals = floor(random(5, 9));
    this.angle = random(TWO_PI);
    this.speed = random(0.01, 0.03);
  }
  
  update() {
    // Gentle swaying motion
    this.angle += this.speed;
    this.x += sin(time + this.x * 0.01) * 0.5;
    this.y += cos(time + this.y * 0.01) * 0.5;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    
    // Draw stem
    stroke(120, 40, 60);
    strokeWeight(2);
    line(0, 0, 0, this.size * 1.5);
    
    // Draw petals
    noStroke();
    fill(this.col);
    for (let i = 0; i < this.petals; i++) {
      let angle = (TWO_PI / this.petals) * i;
      push();
      rotate(angle);
      beginShape();
      vertex(0, 0);
      bezierVertex(
        this.size * 0.5, -this.size * 0.2,
        this.size * 0.8, -this.size * 0.1,
        this.size, 0
      );
      bezierVertex(
        this.size * 0.8, this.size * 0.1,
        this.size * 0.5, this.size * 0.2,
        0, 0
      );
      endShape();
      pop();
    }
    
    // Draw center
    fill(40, 80, 100);
    ellipse(0, 0, this.size * 0.3);
    
    pop();
  }
} 