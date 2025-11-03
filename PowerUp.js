class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.active = true;
  }

  randomSpawn() {
    // Define potential spawn locations
    const spot1 = createVector(200, 300);
    const spot2 = createVector(700, 495);

    // Randomly choose one
    if (int(random(2)) === 0) {
      this.x = spot1.x;
      this.y = spot1.y;
    } else {
      this.x = spot2.x;
      this.y = spot2.y;
    }
  }

  display() {
    if (this.active) {
      noStroke();
      fill(255, 255, 0);
      ellipse(this.x, this.y, this.size, this.size);
    }
  }

  collidesWith(player) {
    if (!this.active) return false;
    return (
      player.pos.x < this.x + this.size / 2 &&
      player.pos.x + player.w > this.x - this.size / 2 &&
      player.pos.y < this.y + this.size / 2 &&
      player.pos.y + player.h > this.y - this.size / 2
    );
  }
}
