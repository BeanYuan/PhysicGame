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
        .setScale(0.2)
        .on('pointerup', () => {
            this.isPointerDown = false;
        })
        .on('pointerdown', (pointer) => {
            this.isPointerDown = true;
            this.throwable = true;
            console.log('Sprite pressed!');

            // 设定时间阈值，例如：2 秒
            const timeThreshold = 1000;

            // 设置定时器，在指定时间后取消 pointerdown
            this.pointerDownTimeout = this.time.delayedCall(timeThreshold, () => {
                this.input.activePointer.isDown = false;
                this.isPointerDown = false;
                this.egg.body.allowGravity = true;
                console.log('Pointerdown cancelled after 2 seconds.');
            });

            this.startDragX = pointer.x;
            this.startDragY = pointer.y;
            this.startDragTime = this.time.now;
        });
        
        this.input.on('pointerup', (pointer) => {
            // remove timer
            if (this.pointerDownTimeout) {
                this.pointerDownTimeout.remove(false);
                this.pointerDownTimeout = null;
            }
            
            if (this.throwable) {
                // test speed
                const minSpeed = 0.5;

                this.endDragX = pointer.x;
                this.endDragY = pointer.y;
                this.endDragTime = this.time.now;
        
                const throwStrength = 200; // 自定义投掷力度
                const dx = this.endDragX - this.startDragX;
                const dy = this.endDragY - this.startDragY;
                const dt = (this.endDragTime - this.startDragTime) / 10;

                const speed = Math.sqrt(dx * dx + dy * dy) / dt;

                if (speed < minSpeed) {
                    return; // 如果鼠标速度小于阈值，则不抛出精灵
                }

                const direction = new Phaser.Math.Vector2(dx * 10, dy * 10);
                direction.normalize(); // 单位化向量

                this.egg.body.setVelocity(direction.x * throwStrength, direction.y * throwStrength);

                // finish calculate and clean the vale
                this.startDragX = 0;
                this.startDragY = 0;
                this.endDragX = 0;
                this.endDragY = 0;
                this.throwable = false;
            }
            
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

        if (this.egg.body.velocity.y == 0 && this.egg.body.velocity.x > 0) {
            const drag = 5; // 自定义拖拽力度
            if (this.egg.body.velocity.x > 0) {
                this.egg.body.velocity.x = Math.max(0, this.egg.body.velocity.x - drag);
            } else if (this.egg.body.velocity.x < 0) {
                this.egg.body.velocity.x = Math.min(0, this.egg.body.velocity.x + drag);
            }
        }
    }
}