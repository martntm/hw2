class Boss {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.w = 60;
    this.h = 60;
    this.speed = 2;
    this.shootInterval = 90;
    this.shootTimer = 0;
    this.img = img;
    this.projectiles = [];
    this.movingRight = true;
  }

  update(player) {
    this.shootTimer++;

    if (this.movingRight) {
      this.x += this.speed;
      if (this.x > width - this.w / 2) this.movingRight = false;
    } else {
      this.x -= this.speed;
      if (this.x < this.w / 2) this.movingRight = true;
    }

    // Shooting logic
    if (this.shootTimer >= this.shootInterval && player) {
      this.shootTimer = 0;
      const ang = atan2(player.pos.y - this.y, player.pos.x - this.x);
      this.projectiles.push(
        new BossProjectile(this.x, this.y, cos(ang) * 4, sin(ang) * 4)
      );
    }

    this.projectiles.forEach(p => p.update());
    this.projectiles = this.projectiles.filter(p => !p.dead);
  }

  display() {
    if (this.img) {
      imageMode(CENTER);
      image(this.img, this.x, this.y, this.w, this.h);
    } else {
      noStroke();
      fill(255, 200, 0);
      rectMode(CENTER);
      rect(this.x, this.y, this.w, this.h, 8);
    }

    this.projectiles.forEach(p => p.display());
  }
}
