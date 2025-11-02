let gameState = 0; // 0 = Menu, 1 = Game, 2 = Credits
let startButton, creditsButton;

let bgMusic, damageSound;

let player;
let ground, platform1, platform2, platform3, platform4, platform5, platform6, platform7, platform8, platform9;
let ladder, ladder2, ladder3, ladder4, ladder5, ladder6, ladder7, ladder8;
let enemy, enemy2, enemy3, enemy4, enemy5;
let power;
let goal;
let boss;

let playerImg, enemyImg, bossImg;

function preload() {
  soundFormats('mp3','wav','ogg');
  try { bgMusic = loadSound('assets/background.wav'); } catch(e){}
  try { damageSound = loadSound('assets/damage.wav'); } catch(e){}
  try { playerImg = loadImage('assets/player.png'); } catch(e){}
  try { enemyImg  = loadImage('assets/enemy.png'); } catch(e){}
  try { bossImg   = loadImage('assets/boss.png'); } catch(e){}
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  startButton = new Button(width/2, height/2 - 40, 200, 60, 'Start');
  creditsButton = new Button(width/2, height/2 + 40, 200, 60, 'Credits');

  ground = new Platform(width/2, height - 20, width, 40);
  platform1 = new Platform(150, 480, 220, 20);
  platform2 = new Platform(400, 420, 180, 20);
  platform3 = new Platform(650, 360, 220, 20);
  platform4 = new Platform(120, 300, 160, 20);
  platform5 = new Platform(330, 260, 200, 20);
  platform6 = new Platform(580, 220, 160, 20);
  platform7 = new Platform(740, 160, 120, 20);
  platform8 = new Platform(420, 140, 160, 20);
  platform9 = new Platform(220, 100, 140, 20);

  ladder  = new Ladder(150, 440, 40, 80);
  ladder2 = new Ladder(650, 320, 40, 80);
  ladder3 = new Ladder(120, 260, 40, 80);
  ladder4 = new Ladder(330, 220, 40, 80);
  ladder5 = new Ladder(580, 180, 40, 80);
  ladder6 = new Ladder(740, 120, 40, 80);
  ladder7 = new Ladder(420, 100, 40, 80);
  ladder8 = new Ladder(220,  60, 40, 80);

  enemy  = new Enemy(500, 380, enemyImg);
  enemy2 = new Enemy(250, 460, enemyImg);
  enemy3 = new Enemy(650, 320, enemyImg);
  enemy4 = new Enemy(330, 220, enemyImg);
  enemy5 = new Enemy(120, 260, enemyImg);

  power = new PowerUp(60, 560, 20);
  goal  = new Goal(760, 80, 30);

  boss = new Boss(700, 80, bossImg);

  player = new Player(60, height - 60, playerImg);

  if (bgMusic && !bgMusic.isPlaying()) bgMusic.loop();
}

function draw() {
  background(30);

  if (gameState === 0) {
    fill(255);
    textSize(48);
    text('CCHW2', width/2, height/2 - 140);
    startButton.update(mouseX, mouseY);
    creditsButton.update(mouseX, mouseY);
    startButton.display();
    creditsButton.display();
  } else if (gameState === 1) {
    updateGame();
    renderGame();
  } else if (gameState === 2) {
    fill(255);
    textSize(24);
    text('Credits\nPress any key to return', width/2, height/2);
  }
}

function mousePressed() {
  if (gameState === 0) {
    if (startButton.isClicked(mouseX, mouseY)) {
      gameState = 1;
      if (bgMusic && !bgMusic.isPlaying()) bgMusic.loop();
    } else if (creditsButton.isClicked(mouseX, mouseY)) {
      gameState = 2;
    }
  }
}

function keyPressed() {
  if (gameState === 2) gameState = 0;
}

function updateGame() {
  const platforms = [ground,platform1,platform2,platform3,platform4,platform5,platform6,platform7,platform8,platform9];
  const ladders   = [ladder,ladder2,ladder3,ladder4,ladder5,ladder6,ladder7,ladder8];
  const enemies   = [enemy,enemy2,enemy3,enemy4,enemy5];

  player.update(platforms, ladders);
  enemies.forEach(e => e.update());
  boss.update(player);

  if (power && player.overlapsCircle(power.x, power.y, power.size)) {
    power = null;
  }

  if (goal && dist(player.x, player.y, goal.x, goal.y) < goal.r + player.w*0.5) {
    gameState = 2;
  }

  enemies.forEach(e => {
    if (player.overlapsBox(e.x, e.y, e.w, e.h)) {
      if (damageSound) damageSound.play();
      player.hit();
    }
  });

  boss.projectiles.forEach(p => {
    if (player.overlapsCircle(p.x, p.y, p.r)) {
      if (damageSound) damageSound.play();
      player.hit();
      p.dead = true;
    }
  });
  boss.projectiles = boss.projectiles.filter(p => !p.dead);
}

function renderGame() {
  ground.display();
  platform1.display(); platform2.display(); platform3.display();
  platform4.display(); platform5.display(); platform6.display();
  platform7.display(); platform8.display(); platform9.display();

  ladder.display(); ladder2.display(); ladder3.display(); ladder4.display();
  ladder5.display(); ladder6.display(); ladder7.display(); ladder8.display();

  if (goal) goal.display();
  if (power) power.display();

  enemy.display(); enemy2.display(); enemy3.display(); enemy4.display(); enemy5.display();
  boss.display();

  player.display();
}
