class Enemy {
  constructor(x,y,img){ this.x=x; this.y=y; this.w=40; this.h=40; this.vx=2; this.img=img; }
  update(){ this.x += this.vx; if (this.x<40 || this.x>width-40) this.vx*=-1; }
  display(){
    if (this.img) imageMode(CENTER), image(this.img, this.x, this.y, this.w, this.h);
    else noStroke(), fill(220,60,60), rect(this.x, this.y, this.w, this.h, 6);
  }
}
