import 'phaser';
import axios from 'axios';

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let platforms;
let pirates;
let player;
let bombs;
let cursors;
let hearts;
let score = 0;
let scoreText;
let gameOver = false;


function preload() {
  this.load.image('sky', '/assets/sky.png');
  this.load.image('ground', '/assets/platform.png');
  this.load.image('heart', '/assets/heart.png');
  this.load.image('bomb', '/assets/bomb.png');
  this.load.image('pirate1', '/assets/pirate1.png');
  this.load.spritesheet('pirate', '/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');


  player = this.physics.add.sprite(100, 450, 'pirate');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('pirate', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'pirate', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('pirate', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });


  hearts = this.physics.add.group({
    key: 'heart',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  hearts.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  pirates = this.physics.add.group();
  createPirate(1);

  bombs = this.physics.add.group();

  // Bombs collider
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);

  // Platform collider
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(hearts, platforms);

  // Hearts collider
  this.physics.add.overlap(player, hearts, collectHeart, null, this);

  // Pirates collider
  this.physics.add.collider(pirates, platforms);
  this.physics.add.collider(player, pirates, pirateFight, null, this);

  cursors = this.input.keyboard.createCursorKeys();
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}

function update() {
  if (gameOver) return;
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-350);
  }
}

function collectHeart(player, heart) {
  console.log('collect')
  heart.disableBody(true, true);

  score += 1;
  scoreText.setText('Score: ' + score);

  if (hearts.countActive(true) === 0) {
    hearts.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    let bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 50);
    bomb.allowGravity = false;
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
}

function createPirate(index) {
  let enemy = pirates.create(16, 16, 'pirate' + index);
  enemy.setBounce(1);
  enemy.setCollideWorldBounds(true);
  enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
  enemy.allowGravity = false;
}

function pirateFight() {
  this.physics.pause();
  player.anims.play('turn');
}
