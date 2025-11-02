class PowerUp {
  constructor(x,y,size){ this.x=x; this.y=y; this.size=size; }
  display(){ noStroke(); fill(255,255,0); ellipse(this.x, this.y, this.size*2, this.size*2); }
}
