import config from '../config';

function preload() {
  this.load.image('fail-banner', ASSETS_PATH + 'assets/fail-banner.png');
}

function create() {
  this.banner = this.add.image(400, 300, 'fail-banner');
  this.failText = this.add.text(config.WIDTH / 2 - 50, config.HEIGHT/2, 'You dissapoint me!\nPress anywhere to restart...', { fontSize: '30px', fill: '#f00', backgroundColor: '#fff' });
  this.input.once('pointerdown', function () {
    this.scene.stop('failScene');
    this.scene.launch('pirateScene');
  }, this);
}


export default {
  key: 'failScene',
  active: false,
  preload,
  create,
};
