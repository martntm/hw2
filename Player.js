class Player {
  constructor(x, y, sprite, damageSound) {
    this.pos = createVector(x, y);
    this.w = 20;
    this.h = 20;
    this.speed = 3;
    this.gravity = 5;
    this.onLadder = false;
    this.onGround = false;
    this.invincible = false;
    this.invincibleTimer = 0;
    this.lives = 3;
    this.damageCooldown = 0;
    this.sprite = sprite;
    this.damageSound = damageSound;
    this.damageSoundPlaying = false;
  }

  update(platforms, ladders) {
    this.handleInput();

    // Ladder detection
    this.onLadder = false;
    for (let l of ladders) {
      if (this.checkLadderCollision(l)) {
        this.onLadder = true;
        break;
      }
    }

    // Gravity
    if (!this.onLadder) this.pos.y += this.gravity;

    // Platform collision
    this.onGround = false;
    for (let p of platforms) {
      if (
        this.pos.x + this.w > p.x &&
        this.pos.x < p.x + p.w &&
        this.pos.y + this.h >= p.y &&
        this.pos.y + this.h <= p.y + 20 &&
        this.pos.y < p.y
      ) {
        this.pos.y = p.y - this.h;
        this.onGround = true;
        break;
      }
    }

    // Constrain to screen
    this.pos.x = constrain(this.pos.x, 0, width - this.w);
    this.pos.y = constrain(this.pos.y, 0, height - this.h);

    // Timers
    if (this.damageCooldown > 0) this.damageCooldown--;
    if (this.invincible) {
      this.invincibleTimer--;
      if (this.invincibleTimer <= 0) this.invincible = false;
    }

    if (this.damageCooldown <= 0) this.damageSoundPlaying = false;
  }

  handleInput() {
    if (keyIsPressed) {
      if (key === 'a' || keyCode === LEFT_ARROW) this.pos.x -= this.speed;
      if (key === 'd' || keyCode === RIGHT_ARROW) this.pos.x += this.speed;
      if (this.onLadder) {
        if (key === 'w' || keyCode === UP_ARROW) this.pos.y -= this.speed;
        if (key === 's' || keyCode === DOWN_ARROW) this.pos.y += this.speed;
      }
    }
  }

  checkLadderCollision(l) {
    return (
      this.pos.x + this.w > l.x &&
      this.pos.x < l.x + l.w &&
      this.pos.y + this.h > l.y &&
      this.pos.y < l.y + l.h
    );
  }

  takeDamage() {
    if (this.damageCooldown === 0 && !this.invincible) {
      this.lives--;
      this.damageCooldown = 60;

      if (this.damageSound && !this.damageSoundPlaying) {
        this.damageSoundPlaying = true;
        this.damageSound.play();
      }

      if (this.lives <= 0) {
        console.log("Game Over");
        noLoop();
      }
    }
  }

  activateInvincibility(duration) {
    this.invincible = true;
    this.invincibleTimer = duration;
  }

  display() {
    if (this.invincible) tint(255, 255, 0);
    else noTint();

    if (this.sprite) {
      image(this.sprite, this.pos.x, this.pos.y, this.w, this.h);
    } else {
      fill(80, 180, 255);
      rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    // HUD
    noTint();
    fill(0);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Lives: " + this.lives, 10, 20);
  }
}
