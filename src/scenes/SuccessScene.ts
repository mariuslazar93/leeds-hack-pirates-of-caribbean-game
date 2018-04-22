import config from '../config';

function preload() {
  this.load.image('success-banner', ASSETS_PATH + 'assets/success-banner.png');
}

function create() {
  this.banner = this.add.image(400, 300, 'success-banner');
  const message = [
    'Congrats!',
    'You did it my friend!',
    'Come here and to get a real PIRATE hug!\n\n',
    'Now if you want another hug...',
    'Start again by pressing anywhere...'
  ];
  this.congratsText = this.add.text(config.WIDTH / 2 - 100, config.HEIGHT/2 + 39, message, { fontSize: '24px', fill: '#aa0000', backgroundColor: '#fff' });

  this.input.once('pointerdown', function () {
    this.scene.launch('pirateScene');
  }, this);
}

export default {
  key: 'successScene',
  active: false,
  preload,
  create,
};

