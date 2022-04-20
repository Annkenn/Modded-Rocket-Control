class Spirit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, type) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);     //add to existing scene
        this.points = pointValue;     //store pointValue
        this.type = type;
        this.moveSpeed = game.settings.spiritSpeed;           //pixels per frame
        if (this.type == 2) {
            this.moveSpeed = game.settings.spiritSpeed + 1;
        };
        //animation
        this.anims.create({
            key: 'spiritanim',
            frames: this.anims.generateFrameNumbers('spiritanim', {start: 0, end: 1, 
            first: 0}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'speedspiritanim',
            frames: this.anims.generateFrameNumbers('speedspiritanim', {start:0, end: 1,
            first: 0}),
            frameRate: 7,
            repeat: -1
        });
        if (this.type == 1) {
            this.anims.play('spiritanim');
        } else {
            this.anims.play('speedspiritanim');
        };
    }

    update() {
        //move spaceship left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }
    //position reset
    reset() {
        this.x = game.config.width;
    }
}