let sitLeft = "assets/cat/white_cat_sitting_left.png";
let sitRight = "assets/cat/white_cat_sitting_right.png";

// Movements from user input
let moves = {
    pause: " ",  // Pause using space
    sitLeft,  // Encapsulate sitLeft
    sitRight,  // Encapsulate sitRight
    directionChanges: {
        // Move with arrow keys
        "ArrowLeft": {  // West
            x: -1, y: 0,
            backgroundImage: "assets/cat/white_cat_walking_left.png",
            sitBackgroundImage: sitLeft,
        },
        "ArrowUp": {  // North
            x: 0, y: 1,
            backgroundImage: "assets/cat/white_cat_walking_left.png",  // TODO: Want a different one for each direction
            sitBackgroundImage: sitLeft,
        },
        "ArrowRight": {  // East
            x: 1, y: 0,
            backgroundImage: "assets/cat/white_cat_walking_right.png",
            sitBackgroundImage: sitRight,
        },
        "ArrowDown": {  // South
            x: 0, y: -1,
            backgroundImage: "assets/cat/white_cat_walking_right.png",  // TODO: Want a different one for each direction
            sitBackgroundImage: sitRight,
        },
        // TODO: Allow WASD movement, too?
    },
}