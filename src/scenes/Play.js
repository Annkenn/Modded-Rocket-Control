class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    preload() {
        //load images tile sprites
        this.load.image('arrow', './assets/arrow.png');
        this.load.image('spirit', './assets/spirit.png');
        this.load.image('sunset','./assets/sunset.png');
        this.load.image('mountains', './assets/mountains.png');
        this.load.image('trees', './assets/trees.png');
        this.load.spritesheet('spiritdeath', './assets/spiritdeath.png', {frameWidth: 64,
        frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('spiritanim', './assets/spiritanim.png', {frameWidth: 64, 
        frameHeight: 32, startFrame: 0, endFrame:1});
        this.load.spritesheet('speedspiritanim', './assets/speedspiritanim.png', 
        {frameWidth: 48, frameHeight: 32, startFrame: 0, endFrame: 1});
        this.load.spritesheet('speedspiritdeath', './assets/speedspiritdeath.png', 
        {frameWidth: 48, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image('gameover', './assets/gameover.png');
    }
    create() {
        //place tile sprite
        this.sunset = this.add.tileSprite(0, 0, 640, 480, 'sunset').setOrigin(0, 0);
        this.mountains = this.add.tileSprite(0, 0, 640, 480, 'mountains').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, 640, 480, 'trees').setOrigin(0, 0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 
        0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, 
        borderUISize, 0x000000).setOrigin(0,0);

        //add rocket
        this.p1Arrow = new Arrow(this, game.config.width / 2, 
        game.config.height - borderUISize - borderPadding, 'arrow').setOrigin(0.5, 0);

        //animation config
        this.anims.create({
            key: 'spiritdeath',
            frames: this.anims.generateFrameNumbers('spiritdeath', { start: 0, end: 9, 
            first: 0}),
            frameRate: 12
        });
        this.anims.create({
            key: 'speedspiritdeath',
            frames: this.anims.generateFrameNumbers('speedspiritdeath', {start: 0, 
            end: 9, first: 0}),
            frameRate: 12,
        });

        //add spaceships (x3)
        this.speedspirit = new Spirit(this, game.config.width + borderUISize * 3, 
        borderUISize * 2, 'speedspiritanim', 0, 50, 2).setOrigin(0, 0);

        this.spirit01 = new Spirit(this, game.config.width + borderUISize * 6, 
        borderUISize * 4, 'spiritanim', 0, 30, 1).setOrigin(0,0);

        this.spirit02 = new Spirit(this, game.config.width + borderUISize * 3, 
        borderUISize * 5 + borderPadding * 2, 'spiritanim', 0 , 20, 1).setOrigin(0,0);

        this.spirit03 = new Spirit(this, game.config.width, borderUISize * 6 + 
        borderPadding * 4, 'spiritanim', 0, 10, 1).setOrigin(0,0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //initialize score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderPadding / 5, 
        this.p1Score, scoreConfig);

        //display high score
        this.highScoreShow = this.add.text(borderUISize + borderPadding + 125, borderPadding / 5, 
        highScore, scoreConfig);

        //GAME OVER flag
        this.gameOver = false;
        //60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.menu = this.add.tileSprite(0, 0, 640, 480, 'gameover').setOrigin(0, 0);
            this.gameOver = true;
            if(this.p1Score > highScore) {
                highScore = this.p1Score;
            }
        }, null, this);
    }
    update() {
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }

        this.sunset.tilePositionX -= 1;
        this.mountains.tilePositionX -= 2;
        this.trees.tilePositionX -= 3;

        if (!this.gameOver) {
            this.p1Arrow.update();     //update rocket sprite
            this.spirit01.update();       //update spaceships (x3)
            this.spirit02.update();
            this.spirit03.update();
            this.speedspirit.update();
        }
        //check collisions
        if (this.checkCollision(this.p1Arrow, this.spirit03)) {
            this.p1Arrow.reset();
            this.spiritExplode(this.spirit03);
        }
        if (this.checkCollision(this.p1Arrow, this.spirit02)) {
            this.p1Arrow.reset();
            this.spiritExplode(this.spirit02);
        }
        if (this.checkCollision(this.p1Arrow, this.spirit01)) {
            this.p1Arrow.reset();
            this.spiritExplode(this.spirit01);
        }
        if (this.checkCollision(this.p1Arrow, this.speedspirit)) {
            this.p1Arrow.reset();
            this.spiritExplode(this.speedspirit);
        }
    }
    checkCollision(arrow, spirit) {
        //simple AABB checking
        if (arrow.x < spirit.x + spirit.width && arrow.x + arrow.width > spirit.x &&
        arrow.y < spirit.y + spirit.height && arrow.height + arrow.y > spirit.y) {
            return true;
        } else {
            return false;
        }
    }
    spiritExplode(spirit) {
        //temporarily hide ship
        spirit.alpha = 0;
        //create explosion sprite at ship's position
        if (spirit.type == 1) {
            let boom = this.add.sprite(spirit.x, spirit.y, 'spiritdeath').setOrigin(0, 0);
            boom.anims.play('spiritdeath');             //play explode animation
            boom.on('animationcomplete', () => {     //callback after anim completes
                spirit.reset();                       //reset ship position
                spirit.alpha = 1;                     //make ship visible
                boom.destroy();                     //remove explosion sprite
            });
        } else {
            let smallboom = this.add.sprite(spirit.x, spirit.y, 'speedspiritdeath').setOrigin(0, 0);
            smallboom.anims.play('speedspiritdeath');
            smallboom.on('animationcomplete', () => {
                spirit.reset();
                spirit.alpha = 1;
                smallboom.destroy();
            });
        }
        //score add and repaint
        this.p1Score += spirit.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}