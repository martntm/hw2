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
let gameWon = false;

let playerImg, enemyImg, bossImg;

function preload() {
  soundFormats('mp3', 'wav', 'ogg');
  bgMusic = loadSound('assets/background.wav');
  damageSound = loadSound('assets/damage.wav');
  playerImg = loadImage('assets/player.png');
  enemyImg = loadImage('assets/enemy.png');
  bossImg = loadImage('assets/boss.png');
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  // Buttons
  startButton = new Button(width / 2, height / 2 - 40, 200, 60, "Start");
  creditsButton = new Button(width / 2, height / 2 + 40, 200, 60, "Credits");

  // Player
  player = new Player(10, 500, playerImg, damageSound);

  // Platforms
  ground = new Platform(0, 590, 800, 10);
  platform1 = new Platform(400, 515, 500, 10);
  platform2 = new Platform(450, 450, 500, 10);
  platform3 = new Platform(390, 325, 150, 10);
  platform4 = new Platform(325, 400, 125, 10);
  platform5 = new Platform(200, 500, 150, 10);
  platform6 = new Platform(0, 400, 200, 10);
  platform7 = new Platform(50, 325, 250, 10);
  platform8 = new Platform(530, 250, 275, 10);
  platform9 = new Platform(0, 175, 800, 10);

  // Ladders
  ladder = new Ladder(400, 475, 20, 115);
  ladder2 = new Ladder(585, 450, 20, 65);
  ladder3 = new Ladder(200, 400, 20, 100);
  ladder4 = new Ladder(450, 400, 20, 50);
  ladder5 = new Ladder(50, 325, 20, 75);
  ladder6 = new Ladder(375, 325, 20, 75);
  ladder7 = new Ladder(520, 250, 20, 75);
  ladder8 = new Ladder(750, 175, 20, 75);

  // Power-Up
  power = new PowerUp(0, 0);
  if (power.randomSpawn) power.randomSpawn();

  // Enemies
  enemy = new Enemy(500, 560, 200, 700, enemyImg);
  enemy2 = new Enemy(500, 485, 500, 775, enemyImg);
  enemy3 = new Enemy(700, 420, 575, 750, enemyImg);
  enemy4 = new Enemy(10, 370, 10, 150, enemyImg);
  enemy5 = new Enemy(550, 220, 550, 775, enemyImg);

  // Boss
  boss = new Boss(width / 2 - 50, 30, bossImg);

  // Goal
  goal = new Goal(0, 135);

  if (!bgMusic.isPlaying()) bgMusic.loop();
}

function draw() {
  if (gameState === 0) {
    drawMenu();
  } else if (gameState === 1) {
    drawGame();
  } else if (gameState === 2) {
    drawCredits();
  }
}

function drawMenu() {
  rectMode(CENTER);
  background(30);
  fill(255);
  textSize(48);
  text("Super Grandpa 64", width / 2, 150);

  startButton.update(mouseX, mouseY);
  creditsButton.update(mouseX, mouseY);
  startButton.display();
  creditsButton.display();
}

function drawCredits() {
  rectMode(CENTER);
  background(30);
  fill(255);
  textSize(32);
  text("Credits", width / 2, 100);
  textSize(20);
  text("Game created by Martin Maynard", width / 2, 200);
  text("Art by Martin Maynard", width / 2, 240);
  text("Music & Sounds from Freesound.org", width / 2, 260);
  text("Press any key to return", width / 2, 400);
}

function drawGame() {
  rectMode(CORNER);
  background(135, 206, 235);

  if (gameWon) {
    background(30);
    fill(255, 255, 0);
    textSize(48);
    text("YOU WIN!", width / 2, height / 2);
    textSize(20);
    fill(255);
    text("Press any key to return", width / 2, height / 2 + 60);
    return;
  }

  // Platforms
  ground.display();
  platform1.display();
  platform2.display();
  platform3.display();
  platform4.display();
  platform5.display();
  platform6.display();
  platform7.display();
  platform8.display();
  platform9.display();

  // Ladders
  ladder.display();
  ladder2.display();
  ladder3.display();
  ladder4.display();
  ladder5.display();
  ladder6.display();
  ladder7.display();
  ladder8.display();

  // Enemies
  enemy.update(); enemy.display();
  enemy2.update(); enemy2.display();
  enemy3.update(); enemy3.display();
  enemy4.update(); enemy4.display();
  enemy5.update(); enemy5.display();

  // Boss
  boss.update();
  boss.display();

  // Player
  const platforms = [ground, platform1, platform2, platform3, platform4, platform5, platform6, platform7, platform8, platform9];
  const ladders = [ladder, ladder2, ladder3, ladder4, ladder5, ladder6, ladder7, ladder8];
  player.update(platforms, ladders);
  player.display();

  // Collisions
  if (
    enemy.collidesWith(player) ||
    enemy2.collidesWith(player) ||
    enemy3.collidesWith(player) ||
    enemy4.collidesWith(player) ||
    enemy5.collidesWith(player)
  ) {
    player.takeDamage();
  }

  for (const bp of boss.projectiles) {
    if (dist(bp.x, bp.y, player.pos.x + player.w / 2, player.pos.y + player.h / 2) < 15) {
      player.takeDamage();
    }
  }

  // Power-up
  if (power.active && power.collidesWith(player)) {
    power.active = false;
    player.activateInvincibility(400); // 8 seconds
  }
  power.display();

  // Goal
  goal.display();
  if (goal.collidesWith(player)) {
    gameWon = true;
  }
}

function mousePressed() {
  if (gameState === 0) {
    if (startButton.isClicked(mouseX, mouseY)) {
      gameState = 1;
      if (!bgMusic.isPlaying()) bgMusic.loop();
    } else if (creditsButton.isClicked(mouseX, mouseY)) {
      gameState = 2;
    }
  }
}

function keyPressed() {
  if (gameState === 2 || (gameWon && keyIsPressed)) {
    gameWon = false;
    gameState = 0;
  }
}
