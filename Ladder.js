class Ladder {
  constructor(x,y,w,h){ this.x=x; this.y=y; this.w=w; this.h=h; }
  display(){ noFill(); stroke(180); strokeWeight(3); rect(this.x, this.y, this.w, this.h); }
  contains(px,py){ return px>this.x-this.w/2 && px<this.x+this.w/2 && py>this.y-this.h/2 && py<this.y+this.h/2; }
}
