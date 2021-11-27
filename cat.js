class Cat extends Element {
    constructor() {
        super("div",{
            // Attributes for accessibility
            role: "image",
            "aria-label": "cat",
        }, ...gameBoard.spawnPointCoordinates, 1)

        // Number of glitters found
        this.glitterFound = 0;
        
        // Movements
        this.direction;  // Direction moving, if any
        let sit = "url(\"assets/cat/white_cat_sitting.png\")";
        let walk = "url(\"assets/cat/white_cat_walking.png\")";
        this.element.style.backgroundImage = sit;  // Start sat
        this.animationInterval = this.startAnimation();

        // All possible movements from user input
        this.directionChanges = {
            // Move with arrow keys
            "ArrowLeft": {  // West
                x: -1, y: 0,
                backgroundImage: walk,  // TODO: Want a different one for each direction
            },
            "ArrowUp": {  // North
                x: 0, y: 1,
                backgroundImage: walk,  // TODO: Want a different one for each direction
            },
            "ArrowRight": {  // East
                x: 1, y: 0,
                backgroundImage: walk,  // TODO: Want a different one for each direction
            },
            "ArrowDown": {  // South
                x: 0, y: -1,
                backgroundImage: walk,  // TODO: Want a different one for each direction
            },
            // start / stop movement with space
            " ": {
                x: 0, y: 0,
                backgroundImage: sit,
                notMoving: true,
            },
            // TODO: Allow WASD movement, too?
        }

        // Update coordinates once per 1 ms
        this.allowUserMovement()
    }

    // Change coordinates and gif based on if moving
    moveInDirection(direction) {
        // If the element is meant to be moving/stopping
        let directionChange = this.directionChanges[direction]
        if (directionChange !== undefined) {
            this.x += directionChange.x;
            this.y += directionChange.y;
            this.element.style.backgroundImage = directionChange.backgroundImage;

            if (directionChange.notMoving !== true) {
                // If a coordinate change happened, move the element
                super.move();

                // Check if found a glitter element
                let hasGlitter = gameBoard.areCollisionsWithGlitter(this.x, this.y);
                if (hasGlitter > 0) {
                    this.glitterFound += hasGlitter;
                    document.querySelector("#score").innerText = this.glitterFound;
                    // TODO: Add more glitter to the board
                }
                // TODO: Check for collision with tail
            }

            // If no change don't interrupt animation
            if (this.direction !== direction) {
                this.animationInterval = this.startAnimation();
            }
        }

        // Save direction so can tell if need to start animation over
        // which happens when changing direction or to/from sit/stand
        this.direction = direction;
    }

    startAnimation() {
        this.stopAnimation();  // Make sure it's stopped first
        let widthOfSpriteSheet = 64 * 3; 
        let xPosition = 0;  // Start x position for the element

        return setInterval(() => {
            this.element.style.backgroundPosition = `-${xPosition}px 0px`;
      
            if (xPosition < widthOfSpriteSheet) {
                // Increment the position by the width of each sprite each time
                xPosition += 64;  // Size of each sprite
            } else {
                // Reset the position to show first sprite after the last one
                xPosition = 0;
            }
        }, 300);
    }

    // Stop Animation
    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }

    // Allow the user to move this element
    allowUserMovement() {
        let direction;  // Make available otuside of event listener

        // Move using arrow keys
        document.addEventListener('keydown', function(e){
            // Ignore repeated keypresses (no change)
            if(e.repeat) return;
            direction = e.key;
        })

        // Update location once per 1 ms
        setInterval(() => {
            this.moveInDirection(direction)
        }, 1);
    }
}
