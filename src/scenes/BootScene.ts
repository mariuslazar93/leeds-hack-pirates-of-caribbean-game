import config from '../config';

function preload() {
  this.load.image('skull', ASSETS_PATH + 'assets/skull.png');
}

function create() {
  this.add.image(config.WIDTH / 2, config.HEIGHT / 2 - 50, 'skull');
  const instructions = [
    "Collect all the treasures",
    "And stay away from the pirates",
  ];


  this.pressX = this.add.text(config.WIDTH / 2 - 135, config.HEIGHT - 50, 'PRESS X TO START', { fontSize: '30px', fill: '#000', backgroundColor: '#fff' });
  this.instructions = this.add.text(25, 100, instructions, { fontSize: '20px', fill: '#000', backgroundColor: '#fff' });
  this.blink = 1000;
  this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

}

function update(time, delta) {
  this.blink -= delta;
  if (this.blink < 0) {
    this.pressX.alpha = this.pressX.alpha === 1 ? 0 : 1;
    this.blink = 500;
  }

  if (this.startKey.isDown) {
    this.scene.stop('bootScene');
    this.scene.launch('pirateScene');
  }
}

export default {
  key: 'bootScene',
  active: true,
  preload,
  create,
  update
};
