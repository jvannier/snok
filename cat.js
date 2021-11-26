class Cat extends Element {
    constructor(x, y) {
        super("div",{
            // Attributes for accessibility
            role: "image",
            "aria-label": "cat",
        }, x, y, 1)
        
        this.direction;  // Direction moving, if any
        this.sit = "url(\"assets/cat/white_cat_sitting.png\")"
        this.walk = "url(\"assets/cat/white_cat_walking.png\")"
        this.element.style.backgroundImage = this.sit  // Start sat
        this.animationInterval = this.startAnimation();

        // Allow movement with arrow keys
        this.directionChanges = {
            "ArrowLeft": {  // West
                x: -1,
                y: 0,
                backgroundImage: this.walk,  // TODO: Want a different one for each direction
            },
            "ArrowUp": {  // North
                x: 0,
                y: 1,
                backgroundImage: this.walk,  // TODO: Want a different one for each direction
            },
            "ArrowRight": {  // East
                x: 1,
                y: 0,
                backgroundImage: this.walk,  // TODO: Want a different one for each direction
            },
            "ArrowDown": {  // South
                x: 0,
                y: -1,
                backgroundImage: this.walk,  // TODO: Want a different one for each direction
            },
            // TODO: Allow WASD movement, too?
        }

        // Update coordinates once per 1 ms
        this.allowUserMovement()
    }

    // Change coordinates and gif based on if moving
    moveInDirection(direction) {
        // start / stop movement with space
        if (direction === " " && this.direction !== direction) {
            this.element.style.backgroundImage = this.sit;
            this.animationInterval = this.startAnimation();
        }

        // If the element is meant to be moving
        let directionChange = this.directionChanges[direction]
        if (directionChange !== undefined) {
            this.x += directionChange.x;
            this.y += directionChange.y;
            this.element.style.backgroundImage = directionChange.backgroundImage;
            super.move();

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
