class SuccessfulScene extends Phaser.Scene {
    constructor() {
        super("successfulscene");
    }
    preload() {
        this.load.path = './src/assets/';
        this.load.spritesheet("buttonSheet", "textures/button/Spritesheet_UI_Flat_Button_02.png", {frameWidth:96,frameHeight:32});
        this.load.image("startButton", "textures/button/start_button.png");
        this.load.image("startButtonHover", "textures/button/start_button_hover.png");
    }
    create() {
        this.registry.set("level", this.registry.get("level") + 1);
        let startButton = this.add.image(380, 350, 'startButton')
        .setScale(2.3)
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
                //   this.scene.start('firstlevel');
                    let selectLevel = this.game.config.globalFunctions.selectLevel;
                    selectLevel(this.scene);
                }
            });
            this.selectLevel();
        });
        let startButtonText = this.add.text(315, 340, "Contiue", {
             fontSize: '32px',
             color: "#f7b457"
        });
        let successfulText = this.add.text(290, 250, "Successful", {
                fontSize: '32px',
                color: "#f7b457"
        });
        let score = this.add.text(270, 290, "Score: " + this.registry.get('score'), {
            fontSize: '24px',
            color: "#f7b457"
        });
        let mask = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000);
        mask.setOrigin(0, 0);
        mask.alpha = 0;
    }

    selectLevel() {
        if (this.registry.get('level') == 1) {
            this.scene.start("firstlevel");
        } else if (this.registry.get('level') == 2) {
            this.scene.start("secondlevel");
        } else if (this.registry.get('level') == 3) {
            this.scene.start("thirdlevel");
        } else if (this.registry.get('level') == 4) {
            this.scene.start("finalscene");
        }
    }
}