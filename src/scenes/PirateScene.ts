import axios from 'axios';

class PirateScene extends Phaser.Scene {

  // CONSTANTS
  WIDTH = 1200;
  HEIGHT = 600;
  ENEMIES_COUNT = 10;
  PALMS_COUNT = 20;
  TREASURES_COUNT = 10;
  LIVES = 3;

  platforms;
  pirates;
  player;
  treasures;
  cursors;
  hearts;
  heartsArr = [];
  livesLeft = 3;
  score = 0;
  scoreText;
  livesText;
  gameOver = false;
  insultText;
  comebackText;
  fightResultSuccessText;
  fightResultFailText;
  currentInsult;
  palms;

  constructor(test) {
    super({
      key: 'PirateScene'
    });
  }

  preload() {
    this.load.audio('overworld', [
      'assets/music/overworld.ogg',
      'assets/music/overworld.mp3'
    ]);
    this.load.image('sky', '/assets/sky.png');
    this.load.image('treasure', '/assets/treasure.png');
    this.load.image('palm', '/assets/palm.png');
    this.load.image('heart', '/assets/heart.png');
    this.load.image('enemy-pirate', '/assets/pirate.png');
    this.load.spritesheet('my-pirate', '/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    // addMusic.call(this);
    this.add.image(this.WIDTH / 2, this.HEIGHT / 2, 'sky').setScale(2);

    this.player = this.physics.world.add.sprite(50, 50, 'my-pirate');
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);

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

    this.pirates = this.physics.add.group();
    for (let i = 0; i < this.ENEMIES_COUNT; i++) {
      this.createPirate();
    }

    this.treasures = this.physics.add.staticGroup();
    for (let i = 0; i < this.TREASURES_COUNT; i++) {
      this.createStaticItem(this.treasures, 'treasure');
    }

    this.palms = this.physics.add.staticGroup();
    for (let i = 0; i < this.PALMS_COUNT; i++) {
      this.createStaticItem(this.palms, 'palm');
    }

    this.hearts = this.physics.add.group();
    this.showLives();

    // Palms collider
    this.physics.world.add.collider(this.pirates, this.palms);
    this.physics.world.add.collider(this.palms, this.treasures);
    this.physics.world.add.collider(this.player, this.palms);

    // Treasures collider
    this.physics.world.add.collider(this.player, this.treasures, this.collectTreasure, null, this);

    // Pirates collider
    this.physics.world.add.collider(this.player, this.pirates, this.pirateFight, null, this);
    this.physics.world.add.collider(this.pirates, this.treasures);


    this.cursors = this.input.keyboard.createCursorKeys();
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '16px', fill: '#000', backgroundColor: '#fff' });
    this.livesText = this.add.text(this.WIDTH - 200, 16, 'Lives: ', { fontSize: '16px', fill: '#000', backgroundColor: '#fff' });
    this.insultText = this.add.text(150, 64, '', { fontSize: '16px', fill: '#000', backgroundColor: '#fff' });
    this.comebackText = this.add.text(150, 100, '', { fontSize: '16px', fill: '#000', backgroundColor: '#fff' });
    this.fightResultFailText = this.add.text(150, 16, '', { fontSize: '16px', fill: '#fff', backgroundColor: '#f00' });
    this.fightResultSuccessText = this.add.text(150, 16, '', { fontSize: '16px', fill: '#000', backgroundColor: '#0f0' });
  }

  update() {
    if (this.gameOver) return;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('turn', true);
    }
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play('turn', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    // if (cursors.up.isDown && player.body.touching.down) {
    //   player.setVelocityY(-350);
    // }
  }

  collectTreasure(player, treasure) {
    console.log('collect')
    treasure.disableBody(true, true);

    this.score += 1;
    this.scoreText.setText('Score: ' + this.score + ' / ' + this.TREASURES_COUNT);

    if (this.treasures.countActive(true) === 0) {
      this.physics.pause();
      this.player.setTint(0x00ff00);
      this.player.anims.play('turn');
      this.gameOver = true;
    }
  }

  createPirate() {
    const x = Phaser.Math.Between(50, this.WIDTH - 50);
    const y = Phaser.Math.Between(50, this.HEIGHT - 50);
    let enemy = this.pirates.create(x, y, 'enemy-pirate');
    enemy.setBounce(1, 1);
    enemy.setCollideWorldBounds(true);
    enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  showLives() {
    const x = this.WIDTH - 100;
    const y = 20;
    for (let i = 0; i < this.livesLeft; i++) {
      this.heartsArr.push(this.hearts.create(x + i * 30, y, 'heart'));
    }
  }

  loseLife() {
    const heart = this.heartsArr.pop();
    if (heart) {
      heart.disableBody(true, true);
    }
  }

  pirateFight() {
    console.log('pirate collide... begin pirate fight', this.physics);

    this.physics.pause();
    this.player.anims.play('turn');

    const beginFightUrl = 'https://hackers-of-the-caribbeans.herokuapp.com/fight/begin';
    axios.get(beginFightUrl)
      .then(response => response.data)
      .then((data) => {
        this.showInsultAndComeBacks(data.insult, data.comebacks);
      })
      .catch(console.log);
  }

  tryResumingPlay() {
    console.log('try resuming play...');
    const stepUrl = 'https://hackers-of-the-caribbeans.herokuapp.com/fight/step';

    axios.get(stepUrl)
      .then(response => response.data)
      .then((data) => {
        if (data.dead) {
          this.gameOver = true;
        }

        if (data.fight_finished) {
          this.fightResultSuccessText.setText('You have won the battle! Keep playing...');
          this.insultText.setText('');
          this.comebackText.setText('');
          this.physics.resume();
          return;
        }

        if (data.insult === this.currentInsult) {
          setTimeout(this.tryResumingPlay, 10000);
          return;
        }

        if (!data.fight_steps_successful) return;

        const previousResult = data.fight_steps_successful[data.fight_steps_successful.length - 1];

        this.showFightStatus(previousResult);
        this.showInsultAndComeBacks(data.insult, data.comebacks);
      })
      .catch(console.log);
  }

  showInsultAndComeBacks(insult, comebacks) {
    console.log('insult:', insult);
    console.log('comebacks:', comebacks)
    this.currentInsult = insult;
    const insultTxtArr = ['Insult:'];
    insultTxtArr.push(insult);

    let comebackTxtArr = ['Comebacks options:'];
    const orderedComebacks = comebacks.map((comeback, index) => `${index + 1}.${comeback}`);
    comebackTxtArr = [comebackTxtArr, ...orderedComebacks];

    this.insultText.setText(insultTxtArr);
    this.comebackText.setText(comebackTxtArr);

    setTimeout(this.tryResumingPlay, 20000);
  }

  showFightStatus(hasWon) {
    if (hasWon) {
      this.fightResultSuccessText.setText('You have won this round! Let\'s try another one...');
      this.fightResultFailText.setText('');
    } else {
      this.loseLife();
      this.fightResultSuccessText.setText('');
      this.fightResultFailText.setText('You have lost this one! Try again...');
    }
  }

  createStaticItem(group, key) {
    const x = this.randomInRange(50, this.WIDTH - 50);
    const y = this.randomInRange(50, this.HEIGHT - 50);
    let item = group.create(x, y, key);
    item.setCollideWorldBounds(true);
    item.setVelocity(0, 0);
    item.setBounce(0, 0);
  }

  addMusic() {
    const music = this.sound.add('overworld');
    music.play({ loop: true });
  }

  randomInRange(minVal, maxVal) {
    const randVal = minVal + (Math.random() * (maxVal - minVal));
    return Math.round(randVal);
  }
}

export default PirateScene;
