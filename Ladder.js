class Ladder {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    noStroke();
    fill(180, 120, 50);
    rect(this.x, this.y, this.w, this.h);
  }
}
