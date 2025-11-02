class Boss {
  constructor(x,y,img){ this.x=x; this.y=y; this.w=60; this.h=60; this.speed=2; this.shootInterval=60; this.shootTimer=0; this.img=img; this.projectiles=[]; }
  update(player){
    this.shootTimer++;
    if (this.shootTimer>=this.shootInterval){ this.shootTimer=0; const ang=atan2(player.y-this.y, player.x-this.x); this.projectiles.push(new BossProjectile(this.x, this.y, cos(ang)*4, sin(ang)*4)); }
    this.projectiles.forEach(p=>p.update());
    this.projectiles=this.projectiles.filter(p=>!p.dead);
  }
  display(){
    if (this.img) imageMode(CENTER), image(this.img, this.x, this.y, this.w, this.h);
    else noStroke(), fill(255,200,0), rect(this.x, this.y, this.w, this.h, 8);
    this.projectiles.forEach(p=>p.display());
  }
}
