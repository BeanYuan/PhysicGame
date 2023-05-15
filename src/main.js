const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [StartScene, FirstLevel, SecondLevel, ThirdLevel, FinalScene, SuccessfulScene], //
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }, // 可以根据需要调整重力
      debug: false, // 设置为 true 以查看调试信息，如碰撞边界框
    }
  }
};

const game = new Phaser.Game(config);