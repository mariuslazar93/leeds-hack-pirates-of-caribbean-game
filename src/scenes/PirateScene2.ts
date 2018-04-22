import axios from 'axios';
import config from '../config';

const { WIDTH, HEIGHT, LIVES, RETRY_PLAY_TIMEOUT_MS } = config;

const ENEMIES_COUNT = 10;
const PALMS_COUNT = 20;
const TREASURES_COUNT = 10;
let platforms;
let pirates;
let player;
let treasures;
let cursors;
let hearts;
let heartsArr = [];
let livesLeft = 3;
let score = 0;
let scoreText;
let livesText;
let gameOver = false;
let insultText;
let comebackText;
let fightResultSuccessText;
let fightResultFailText;
let currentInsult;
let palms;
let currentScene;

function init(cfg) {
  console.log('config:',cfg);
  if (cfg && cfg.livesLeft) {
    livesLeft = cfg.livesLeft;
  }
}

function preload() {
  this.load.audio('water', [
    'assets/music/water.ogg',
    'assets/music/water.mp3'
  ]);
  this.load.image('sky', ASSETS_PATH + 'assets/sky.png');
  this.load.image('treasure', ASSETS_PATH + 'assets/treasure.png');
  this.load.image('palm', ASSETS_PATH + 'assets/palm.png');
  this.load.image('heart', ASSETS_PATH + 'assets/heart.png');
  this.load.image('enemy-pirate', ASSETS_PATH + 'assets/pirate.png');
  this.load.spritesheet('my-pirate', ASSETS_PATH + 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
  currentScene = this;
  addMusic();
  this.add.image(WIDTH / 2, HEIGHT / 2, 'sky').setScale(2);

  player = this.physics.add.sprite(50, 50, 'my-pirate');
  player.setBounce(0);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('my-pirate', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'my-pirate', frame: 4 }],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('my-pirate', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  pirates = this.physics.add.group();
  for (let i = 0; i < ENEMIES_COUNT; i++) {
    createPirate();
  }

  treasures = this.physics.add.staticGroup();
  for (let i = 0; i < TREASURES_COUNT; i++) {
    createStaticItem(treasures, 'treasure');
  }

  palms = this.physics.add.staticGroup();
  for (let i = 0; i < PALMS_COUNT; i++) {
    createStaticItem(palms, 'palm');
  }

  hearts = this.physics.add.group();
  showLives();

  // Palms collider
  this.physics.add.collider(pirates, palms);
  this.physics.add.collider(palms, treasures);
  this.physics.add.collider(player, palms);

  // Treasures collider
  this.physics.add.collider(player, treasures, collectTreasure, null, this);

  // Pirates collider
  this.physics.add.collider(player, pirates, pirateFight, null, this);
  this.physics.add.collider(pirates, treasures);


  cursors = this.input.keyboard.createCursorKeys();
  scoreText = this.add.text(16, 16, 'Score: 0 / ' + TREASURES_COUNT, { fontSize: '16px', fill: '#000', backgroundColor: '#fff' });
  livesText = this.add.text(WIDTH - 200, 16, 'Lives: ', { fontSize: '16px', fill: '#000', backgroundColor: '#fff' });
  insultText = this.add.text(150, 64, '', { fontSize: '20px', fill: '#000', backgroundColor: '#fff' });
  comebackText = this.add.text(150, 140, '', { fontSize: '20px', fill: '#000', backgroundColor: '#fff' });
  fightResultFailText = this.add.text(150, 16, '', { fontSize: '22px', fill: '#fff', backgroundColor: '#f00' });
  fightResultSuccessText = this.add.text(150, 16, '', { fontSize: '22px', fill: '#000', backgroundColor: '#0f0' });
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
  else if (cursors.up.isDown) {
    player.setVelocityY(-160);
    player.anims.play('turn', true);
  }
  else if (cursors.down.isDown) {
    player.setVelocityY(160);
    player.anims.play('turn', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
}

function collectTreasure(player, treasure) {
  treasure.disableBody(true, true);

  score += 1;
  scoreText.setText('Score: ' + score + ' / ' + TREASURES_COUNT);

  if (treasures.countActive(true) === 0) {
    this.scene.stop('pirateScene2');
    this.scene.launch('successScene');
  }
}

function createPirate() {
  const x = Phaser.Math.Between(50, WIDTH - 50);
  const y = Phaser.Math.Between(50, HEIGHT - 50);
  let enemy = pirates.create(x, y, 'enemy-pirate');
  enemy.setBounce(1, 1);
  enemy.setCollideWorldBounds(true);
  enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
}

function showLives() {
  const x = WIDTH - 100;
  const y = 20;
  for (let i = 0; i < livesLeft; i++) {
    heartsArr.push(hearts.create(x + i * 30, y, 'heart'));
  }
}

function loseLife() {
  livesLeft--;
  const heart = heartsArr.pop();
  if (heart) {
    heart.disableBody(true, true);
  }

  if (livesLeft === 0) {
    this.scene.stop('pirateScene2');
    this.scene.launch('failScene');
  }
}

function pirateFight() {
  console.log('pirate collide... begin pirate fight');

  this.physics.pause();
  player.anims.play('turn');

  const beginFightUrl = 'https://hackers-of-the-caribbeans.herokuapp.com/fight/begin';
  axios.get(beginFightUrl)
    .then(response => response.data)
    .then((data) => {
      showInsultAndComeBacks(data.insult, data.comebacks);
    })
    .catch(console.log);
}

function tryResumingPlay() {
  console.log('try resuming play...');
  const stepUrl = 'https://hackers-of-the-caribbeans.herokuapp.com/fight/step';

  axios.get(stepUrl)
    .then(response => response.data)
    .then((data) => {
      if (data.dead) {
        currentScene.scene.stop('pirateScene2');
        currentScene.scene.launch('failScene');
        this.gameOver = true;
      }

      if (data.fight_finished) {
        fightResultSuccessText.setText('You have won the battle! Keep playing...');
        insultText.setText('');
        comebackText.setText('');
        currentScene.physics.resume();
        return;
      }

      if (data.insult === currentInsult) {
        setTimeout(tryResumingPlay, RETRY_PLAY_TIMEOUT_MS);
        return;
      }

      // if (!data.fight_steps_successful) return;

      const previousResult = data.fight_steps_successful[data.fight_steps_successful.length - 1];

      showFightStatus(previousResult);
      showInsultAndComeBacks(data.insult, data.comebacks);
    })
    .catch(console.log);
}

function showInsultAndComeBacks(insult, comebacks) {
  console.log('comebacks:', comebacks)
  currentInsult = insult;
  const insultTxtArr = ['Insult:\n'];
  insultTxtArr.push(insult);

  let comebackTxtArr = ['Comebacks options:\n'];
  const orderedComebacks = comebacks.map((comeback, index) => `${index + 1}.${comeback}`);
  comebackTxtArr = [comebackTxtArr, ...orderedComebacks];

  insultText.setText(insultTxtArr);
  comebackText.setText(comebackTxtArr);

  setTimeout(tryResumingPlay, RETRY_PLAY_TIMEOUT_MS);
}

function showFightStatus(hasWon) {
  if (hasWon) {
    fightResultSuccessText.setText('You have won the round! Let\'s try another one...');
    fightResultFailText.setText('');
  } else {
    loseLife();
    fightResultSuccessText.setText('');
    fightResultFailText.setText('You have lost this round! Try again...');
  }
}

function createStaticItem(group, key) {
  const x = randomInRange(50, WIDTH - 50);
  const y = randomInRange(50, HEIGHT - 50);
  let item = group.create(x, y, key);
  item.setCollideWorldBounds(true);
  item.setVelocity(0, 0);
  item.setBounce(0, 0);
}

function addMusic() {
  const music = currentScene.sound.add('water');
  music.play({ loop: true });
}

function randomInRange(minVal, maxVal) {
  const randVal = minVal + (Math.random() * (maxVal - minVal));
  return Math.round(randVal);
}

function restart() {
  currentScene.scene.restart();
}


export default {
  key: 'pirateScene2',
  active: false,
  visible: false,
  init,
  preload,
  create,
  update
};
