class StartScene extends Phaser.Scene {
    constructor() {
        super("startscene");
    }
    preload() {
        this.load.path = './src/assets/';
        this.load.spritesheet("buttonSheet", "textures/button/Spritesheet_UI_Flat_Button_02.png", {frameWidth:96,frameHeight:32});
        this.load.image("startButton", "textures/button/start_button.png");
        this.load.image("startButtonHover", "textures/button/start_button_hover.png");
        this.load.image("egg", "textures/icon/egg.png");
    }
    create() {
        let egg = this.add.image(180, 220, 'egg')
        .setScale(0.8);
        let startButton = this.add.image(380, 350, 'startButton')
        .setScale(2)
        .setInteractive()
        .on('pointerover', () => {
            startButton.setTexture('startButtonHover');
        })
        .on('pointerout', () => {
            startButton.setTexture('startButton');
        })
        .on('pointerdown', () => {
            this.tweens.add({
                targets: mask,
                alpha: 1,
                duration: 1000, // 淡出动画持续时间，以毫秒为单位
                onComplete: () => {
                  // 在此处添加场景切换逻辑，例如：
                  this.scene.start('firstlevel');
                }
            });
        });
        let startButtonText = this.add.text(340, 340, "Play", {
             fontSize: '32px',
             color: "#f7b457"
            });
        let sceneTitle = this.add.text(320, 220, "Hold It", {
            fontSize: '32px',
            color: "#f7b457"
           });
        
        let mask = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000);
        mask.setOrigin(0, 0);
        mask.alpha = 0;
    }
}