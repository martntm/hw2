class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    noStroke();
    fill(135, 140, 141);
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.h);
  }
}
