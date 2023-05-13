const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [FirstLevel],//[StartScene, FirstLevel],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }, // 可以根据需要调整重力
      debug: true, // 设置为 true 以查看调试信息，如碰撞边界框
    }
  }
};

const game = new Phaser.Game(config);