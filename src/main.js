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

//Name: Annika Kennedy
//Project Name: Ghost Patrol
//Date: April 19 2022
//Time: prolly 10-15 hour range

//Points Breakdown
//Display high score (5 pts)
//Parallax Scrolling (10 pts)
//Animated spaceships (10 pts) 
//New spaceship type (20 pts) 
//Replace all assets with new theme (60 pts) 
//total = 105 pts

//Elizabeth Arnold helped me figure out high score code
//Used bfxr for the new sounds

