class Player {
  constructor(x,y,img){
    this.x=x; this.y=y; this.w=36; this.h=48;
    this.vx=0; this.vy=0;
    this.onGround=false; this.onLadder=false;
    this.speed=3; this.jumpStrength=9; this.gravity=0.6;
    this.img=img; this.inv=0;
  }

  input(ladders){
    const L = keyIsDown(65) || keyIsDown(37);
    const R = keyIsDown(68) || keyIsDown(39);
    const U = keyIsDown(87) || keyIsDown(38);
    const D = keyIsDown(83) || keyIsDown(40);

    this.onLadder = ladders.some(ld => ld.contains(this.x, this.y));
    this.vx = (R?1:0) - (L?1:0);
    this.vx *= this.speed;

    if (this.onLadder){
      this.vy = ((D?1:0) - (U?1:0)) * this.speed * 0.9;
    } else {
      if (U && this.onGround){ this.vy = -this.jumpStrength; this.onGround=false; }
    }
  }

  physics(platforms){
    if (!this.onLadder) this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    this.onGround=false;
    for (const p of platforms){
      if (this.overlapsBox(p.x, p.y, p.w, p.h)){
        const halfW=p.w/2, halfH=p.h/2;
        const dx=this.x-p.x, dy=this.y-p.y;
        const px=halfW+this.w/2 - Math.abs(dx);
        const py=halfH+this.h/2 - Math.abs(dy);
        if (px<py){
          this.x += (dx>0?1:-1)*px;
          this.vx=0;
        } else {
          this.y += (dy>0?1:-1)*py;
          this.vy=0;
          if (dy<0) this.onGround=true;
        }
      }
    }

    this.x = constrain(this.x, this.w/2, width - this.w/2);
    this.y = constrain(this.y, this.h/2, height - this.h/2);
    if (this.inv>0) this.inv--;
  }

  update(platforms, ladders){
    this.input(ladders);
    this.physics(platforms);
  }

  display(){
    push();
    if (this.inv>0 && frameCount%6<3) tint(255,120);
    if (this.img) imageMode(CENTER), image(this.img, this.x, this.y, this.w, this.h);
    else noStroke(), fill(80,180,255), rect(this.x, this.y, this.w, this.h, 6);
    noTint();
    pop();
  }

  overlapsBox(cx, cy, w, h){
    return (this.x+this.w/2>cx-w/2 && this.x-this.w/2<cx+w/2 && this.y+this.h/2>cy-h/2 && this.y-this.h/2<cy+h/2);
  }

  overlapsCircle(cx, cy, r){
    return dist(this.x, this.y, cx, cy) < r + max(this.w, this.h)*0.35;
  }

  hit(){ this.inv = 60; }
}
