import 'phaser';
import config from './config';
import bootScene from './scenes/BootScene';
import pirateScene from './scenes/PirateScene';

const gameConfig: GameConfig = {
  type: Phaser.AUTO,
  width: config.WIDTH,
  height: config.HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [bootScene, pirateScene]
};

const game = new Phaser.Game(gameConfig);
