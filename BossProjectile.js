class BossProjectile {
  constructor(x,y,dx,dy){ this.x=x; this.y=y; this.dx=dx; this.dy=dy; this.r=8; this.dead=false; }
  update(){ this.x+=this.dx; this.y+=this.dy; if(this.x<-20||this.x>width+20||this.y<-20||this.y>height+20) this.dead=true; }
  display(){ noStroke(); fill(255,180,0); ellipse(this.x, this.y, this.r*2, this.r*2); }
}
