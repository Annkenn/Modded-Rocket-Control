//Elizabeth Arnold helped me figure out high score code
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;


let highScore = 0;
//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;


//Points Breakdown
//Parallax Scrolling (10 pts)

//To Do
//new spaceship type (20 pts) X
//animated spaceships (10 pts) X
//replace all assets with new theme (60 pts) X

