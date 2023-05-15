class ThirdLevel extends Phaser.Scene {
    constructor() {
        super("thirdlevel");
    }

    preload() {
        this.load.path = './src/assets/';
        this.load.image("egg", "textures/icon/egg.png");
        this.load.image("wall", "textures/icon/wall.png");
        this.load.image("bush", "textures/icon/bush.png");
        this.load.image("moveTrap", "textures/icon/move_trap.png");
        this.load.image("startPlace", "textures/icon/start_place.png");
    }

    create() {
        // set background color
        this.registry.set('score', 100);
        this.cameras.main.setBackgroundColor('#f5cf8e');

        this.wallGroup = this.physics.add.group();
        this.createWall();

        this.safeGroup = this.physics.add.group();
        this.createSafeGroup();

        this.startX = 80;
        this.startY = 520;

        this.egg = this.physics.add.sprite(this.startX, this.startY, 'egg')
        .setInteractive()
        .setScale(0.2)
        .setCollideWorldBounds(true)
        .on('pointerup', () => {
            this.isPointerDown = false;
        })
        .on('pointerdown', (pointer, event) => {
            this.isPointerDown = true;
        });

        // set world physics 
        this.physics.add.collider(this.egg, this.wallGroup, this.onWallCollision, null, this);
        this.physics.add.collider(this.egg, this.bushCollider, this.onGameSuccessful, null, this);
        this.physics.add.collider(this.egg, this.safeGroup);
        this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);
    }
    update() {
        if (this.wallCollide) {
            this.egg.x = this.startX;
            this.egg.y = this.startY;
            this.isPointerDown = false;
            this.wallCollide = false;
        }
        else if (this.isPointerDown) {
            const pointer = this.input.activePointer;
            this.egg.x = pointer.x;
            this.egg.y = pointer.y;
            this.egg.body.allowGravity = false;
        } 
        else {
            this.egg.body.allowGravity = true;
        }
    }

    onWallCollision(sprite1, sprite2) {
        this.wallCollide = true;
        this.registry.get('score') - 5
    }

    createSafeGroup() {
        this.startPlace = this.add.tileSprite(80, 565, 100, 18, 'startPlace');
        this.startPlaceCollider = this.safeGroup.create(this.startPlace.x, this.startPlace.y);
        this.startPlaceCollider.setDisplaySize(this.startPlace.width, this.startPlace.height);
        this.startPlaceCollider.setVisible(false);
        this.startPlaceCollider.setImmovable(true);
        this.startPlaceCollider.body.allowGravity = false;

        this.bush = this.add.tileSprite(730, 565, 100, 18, 'bush');
        this.bushCollider = this.safeGroup.create(this.bush.x, this.bush.y);
        this.bushCollider.setDisplaySize(this.bush.width, this.bush.height);
        this.bushCollider.setVisible(false);
        this.bushCollider.setImmovable(true);
        this.bushCollider.body.allowGravity = false;
    }
    createWall() {
        this.wall1 = this.add.tileSprite(400, 580, 800, 10, 'wall');
        this.wall1Collider = this.wallGroup.create(this.wall1.x, this.wall1.y);
        this.wall1Collider.setDisplaySize(this.wall1.width, this.wall1.height);
        this.wall1Collider.setVisible(false);
        this.wall1Collider.setImmovable(true);
        this.wall1Collider.body.allowGravity = false;

        this.wall2 = this.add.tileSprite(400, 100, 800, 10, 'wall');
        this.wall2Collider = this.wallGroup.create(this.wall2.x, this.wall2.y);
        this.wall2Collider.setDisplaySize(this.wall2.width, this.wall2.height);
        this.wall2Collider.setVisible(false);
        this.wall2Collider.setImmovable(true);
        this.wall2Collider.body.allowGravity = false;
        
        this.wall3 = this.add.tileSprite(5, 340, 10, 490, 'wall');
        this.wall3Collider = this.wallGroup.create(this.wall3.x, this.wall3.y);
        this.wall3Collider.setDisplaySize(this.wall3.width, this.wall3.height);
        this.wall3Collider.setVisible(false);
        this.wall3Collider.setImmovable(true);
        this.wall3Collider.body.allowGravity = false;

        this.wall4 = this.add.tileSprite(150, 385, 10, 400, 'wall');
        this.wall4Collider = this.wallGroup.create(this.wall4.x, this.wall4.y);
        this.wall4Collider.setDisplaySize(this.wall4.width, this.wall4.height);
        this.wall4Collider.setVisible(false);
        this.wall4Collider.setImmovable(true);
        this.wall4Collider.body.allowGravity = false;

        this.wall5 = this.add.tileSprite(295, 295, 10, 400, 'wall');
        this.wall5Collider = this.wallGroup.create(this.wall5.x, this.wall5.y);
        this.wall5Collider.setDisplaySize(this.wall5.width, this.wall5.height);
        this.wall5Collider.setVisible(false);
        this.wall5Collider.setImmovable(true);
        this.wall5Collider.body.allowGravity = false;

        this.wall6 = this.add.tileSprite(440, 385, 10, 400, 'wall');
        this.wall6Collider = this.wallGroup.create(this.wall6.x, this.wall6.y);
        this.wall6Collider.setDisplaySize(this.wall6.width, this.wall6.height);
        this.wall6Collider.setVisible(false);
        this.wall6Collider.setImmovable(true);
        this.wall6Collider.body.allowGravity = false;

        this.wall7 = this.add.tileSprite(585, 295, 10, 400, 'wall');
        this.wall7Collider = this.wallGroup.create(this.wall7.x, this.wall7.y);
        this.wall7Collider.setDisplaySize(this.wall7.width, this.wall7.height);
        this.wall7Collider.setVisible(false);
        this.wall7Collider.setImmovable(true);
        this.wall7Collider.body.allowGravity = false;
        
        this.moveTrap1Collider = this.wallGroup.create(20, 150, 'moveTrap');
        this.moveTrap1Collider.setScale(1.2);
        this.moveTrap1Collider.setImmovable(true);
        this.moveTrap1Collider.body.allowGravity = false;
        this.tweens.add({
            targets: this.moveTrap1Collider,
            x: 280, // 目标 x 坐标
            duration: 2000, // 动画持续时间（毫秒）
            ease: 'Linear', // 缓动类型
            yoyo: true, // 动画结束后返回起点
            repeat: -1, // 重复次数，-1 为无限重复
        });

        this.moveTrap2Collider = this.wallGroup.create(170, 540, 'moveTrap');
        this.moveTrap2Collider.setScale(1.2);
        this.moveTrap2Collider.setImmovable(true);
        this.moveTrap2Collider.body.allowGravity = false;
        this.tweens.add({
            targets: this.moveTrap2Collider,
            x: 430, // 目标 x 坐标
            duration: 2000, // 动画持续时间（毫秒）
            ease: 'Linear', // 缓动类型
            yoyo: true, // 动画结束后返回起点
            repeat: -1, // 重复次数，-1 为无限重复
        });

        this.moveTrap3Collider = this.wallGroup.create(310, 150, 'moveTrap');
        this.moveTrap3Collider.setScale(1.2);
        this.moveTrap3Collider.setImmovable(true);
        this.moveTrap3Collider.body.allowGravity = false;
        this.tweens.add({
            targets: this.moveTrap3Collider,
            x: 570, // 目标 x 坐标
            duration: 2000, // 动画持续时间（毫秒）
            ease: 'Linear', // 缓动类型
            yoyo: true, // 动画结束后返回起点
            repeat: -1, // 重复次数，-1 为无限重复
        });
    }
    onGameSuccessful() {
        this.scene.start("successfulscene");
    }
}