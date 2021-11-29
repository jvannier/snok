class Cat extends Element {
    constructor() {
        super("div",{
            // Attributes for accessibility
            role: "image",
            "aria-label": "cat",
        }, ...gameBoard.spawnPointCoordinates, 1);
        // Override coordinate based ID so can put sparkles on spawn point in the future
        this.htmlElement.setAttribute("id", "cat");

        this.sparklesFound = 0;  // Number of sparkles found
        this.sprite = new AnimatedSprite(this.htmlElement);  // Cat sprite to be animated
        this.direction;  // Direction moving, if any

        // Start sat left
        this.backgroundImage = moves.sitLeft;
        this.sprite.sit();
        
        // Update coordinates once per 1 ms
        this.eventInterval = this.listenForUserInput();
    }

    // Check if found a sparkle element
    sparkleCollisions() {
        let hasSparkle = gameBoard.areCollisionsWithSparkle(this.x, this.y);
        if (hasSparkle > 0) {
            this.sparklesFound += hasSparkle;
            document.querySelector("#score").innerText = this.sparklesFound;
            sparkle.newSparkle();  // Also adds to the tail path
            // tail.addToTail(this.x, this.y)
            // console.log(tail.path)
        }
    }
    
    checkCollisions() {
        // Check for collisions with wall
        let lethalCollision = gameBoard.isCollisionWithWall(this.x, this.y);

        // TODO: if there is a collision show the cat falling over?

        // TODO: Check for collision with tail

        // Stop moving if found lethal collision
        if (lethalCollision === true) {
            if (this.eventInterval) {
                clearInterval(this.eventInterval);
            }
            death.youDied();
            this.sprite.stopAnimation();  // Stop cat from moving
        }

        // Check for sparkles element collisions
        this.sparkleCollisions();

    }

    // If the cat is paused sit it down
    catPause(direction) {
        // Stop movement with pause key
        if (this.direction === undefined) {
            // Default to left sit
            this.backgroundImage = moves.sitLeft;
            this.sprite.sit();
        } else if (this.direction !== direction) {
            // Pick which direction to sit based on previous direction
            let oldDirectionChange = moves.directionChanges[this.direction];
            this.backgroundImage = oldDirectionChange.sitBackgroundImage;
            this.sprite.sit();
        }
    }

    // Moves the cat in the given direction
    catMove(direction) {
        let directionChange = moves.directionChanges[direction]
        if (directionChange !== undefined) {
            this.x += directionChange.x;
            this.y += directionChange.y;
            this.backgroundImage = directionChange.backgroundImage;
            super.move();

            // Restart animation if a change occurred
            if (this.direction !== direction) {
                this.sprite.walk();
            }
            return true;  // A move happened
        }
        return false;  //  No move happened
    }
    
    // Change coordinates and animation based on if moving
    moveInDirection(direction) {
        if (direction === moves.pause) {
            this.catPause(direction);
        } else if (this.catMove(direction)) {
            this.checkCollisions();
        }
        
        // Save direction so can tell if need to start animation over
        // which happens when changing direction or to/from sit/stand
        this.direction = direction;
    }

    // Listen for user input to move/stop this element
    listenForUserInput() {
        let direction;  // Make available otuside of event listener

        // Move using arrow keys
        document.addEventListener('keydown', function(e) {
            // Ignore repeated keypresses (no change)
            if(e.repeat) return;

            // Only accept certain key presses
            if (e.key === moves.pause || moves.directionChanges[e.key] !== undefined) {
                direction = e.key;
            }
        })

        // Update location once per 1 ms
        return setInterval(() => {
            this.moveInDirection(direction);
        }, 1);
    }
}
