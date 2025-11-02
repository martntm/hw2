class Goal {
  constructor(x,y,r){ this.x=x; this.y=y; this.r=r; }
  display(){ noStroke(); fill(0,200,255); ellipse(this.x, this.y, this.r*2, this.r*2); }
}
