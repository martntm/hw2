class BossProjectile {
  constructor(x, y, vx = 0, vy = 6) {
    this.x = x;
    this.y = y;
    this.vx = vx; // horizontal velocity
    this.vy = vy; // vertical velocity
    this.size = 12;
    this.dead = false;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.offScreen()) {
      this.dead = true;
    }
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  offScreen() {
    return this.y > height || this.y < 0 || this.x < 0 || this.x > width;
  }
}
