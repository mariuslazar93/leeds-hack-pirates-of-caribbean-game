import 'phaser';
import config from './config';
import bootScene from './scenes/BootScene';
import pirateScene from './scenes/PirateScene';
import pirateScene2 from './scenes/PirateScene2';
import failScene from './scenes/FailScene';
import successScene from './scenes/SuccessScene';

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
  scene: [bootScene, pirateScene, pirateScene2, failScene, successScene]
};

const game = new Phaser.Game(gameConfig);
