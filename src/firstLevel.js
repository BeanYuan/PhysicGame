class FirstLevel extends Phaser.Scene {
    constructor() {
        super("firstlevel");
    }
    preload() {
        this.load.path = './src/assets/';
        this.load.image("egg", "textures/icon/egg.png");
    }
    create() {
        this.egg = this.physics.add.sprite(50, 50, 'egg')
        .setInteractive()
        .setScale(0.5)
        .on('pointerdown', () => {
            this.isPointerDown = true;
        })
        .on('pointerup', () => {
            this.isPointerDown = false;
        })
        .on('pointerdown', (pointer) => {
            this.startDragX = pointer.x;
            this.startDragY = pointer.y;
        });
        
        this.input.on('pointerup', (pointer) => {
            this.endDragX = pointer.x;
            this.endDragY = pointer.y;
    
            const throwStrength = 200; // 自定义投掷力度
            const dx = this.endDragX - this.startDragX;
            const dy = this.endDragY - this.startDragY;

            const direction = new Phaser.Math.Vector2(dx, dy);
            direction.normalize(); // 单位化向量

            this.egg.body.setVelocity(direction.x * throwStrength, direction.y * throwStrength);
        });

        // 如果需要，可以设置 sprite 的属性，如加速度、速度、质量等
        // sprite1.setVelocity(100, 100);
        // sprite2.setMass(2);

        // 可以设置精灵不受重力影响
        // sprite1.body.allowGravity = false;

        // 如果需要，可以设置世界边界，使精灵不会离开画布
        this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);
        this.egg.setCollideWorldBounds(true);
        this.egg.setCollideWorldBounds(true);
    }
    update() {
        if (this.isPointerDown) {
            const pointer = this.input.activePointer;
            this.egg.x = pointer.x;
            this.egg.y = pointer.y;
            this.egg.body.allowGravity = false;
            this.egg.setVelocity(0, 0);
        } else {
            this.egg.body.allowGravity = true;
        }
    }
}