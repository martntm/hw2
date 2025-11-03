class Goal {
  constructor(x, y, r = 30) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  display() {
    noStroke();
    fill(255, 215, 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  collidesWith(player) {
    // Use distance between player and goal center
    const px = player.pos.x + player.w / 2;
    const py = player.pos.y + player.h / 2;
    const d = dist(this.x, this.y, px, py);
    return d < this.r + Math.max(player.w, player.h) / 2;
  }
}
