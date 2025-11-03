class Enemy {
  constructor(x, y, leftBound, rightBound, img) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 30;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.speed = 2;
    this.movingRight = true;
    this.img = img;
  }

  update() {
    if (this.movingRight) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }

    if (this.x > this.rightBound || this.x < this.leftBound) {
      this.movingRight = !this.movingRight;
    }
  }

  display() {
    if (this.img) {
      imageMode(CORNER);
      image(this.img, this.x, this.y, this.w, this.h);
    } else {
      // fallback if image fails to load
      noStroke();
      fill(200, 50, 50);
      rect(this.x, this.y, this.w, this.h);
    }
  }

  collidesWith(p) {
    return (
      p.pos.x + p.w > this.x &&
      p.pos.x < this.x + this.w &&
      p.pos.y + p.h > this.y &&
      p.pos.y < this.y + this.h
    );
  }
}
