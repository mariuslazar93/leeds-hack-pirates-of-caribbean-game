class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
  }
  preload() {
    this.load.audio('overworld', [
      'assets/music/overworld.ogg',
      'assets/music/overworld.mp3'
    ]);
  }
  create() {
    console.log("BOOTED");
    this.scene.start('TitleScene');

  }
}

export default BootScene;
