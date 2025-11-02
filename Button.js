class Button {
  constructor(x, y, w, h, label) { this.x=x; this.y=y; this.w=w; this.h=h; this.label=label; this.hovered=false; }
  update(mx, my){ this.hovered = mx>this.x-this.w/2 && mx<this.x+this.w/2 && my>this.y-this.h/2 && my<this.y+this.h/2; }
  isClicked(mx,my){ return this.hovered; }
  display(){
    noStroke();
    fill(this.hovered?200:150);
    rect(this.x, this.y, this.w, this.h, 10);
    fill(0); textSize(20); text(this.label, this.x, this.y);
  }
}
