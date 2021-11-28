class Cat extends Element {
    constructor() {
        super("div",{
            // Attributes for accessibility
            role: "image",
            "aria-label": "cat",
        }, ...gameBoard.spawnPointCoordinates, 1);

        this.glitterFound = 0;  // Number of glitters found
        this.sprite = new AnimatedSprite(this.htmlElement);  // Cat sprite to be animated
        this.direction;  // Direction moving, if any

        // Start sat left
        this.backgroundImage = moves.sitLeft;
        this.sprite.startAnimation(this.sprite.sitSprites);
        
        // Update coordinates once per 1 ms
        this.eventInterval = this.listenForUserInput();
    }

    // Check if found a glitter element
    glitterCollisions() {
        let hasGlitter = gameBoard.areCollisionsWithGlitter(this.x, this.y);
        if (hasGlitter > 0) {
            this.glitterFound += hasGlitter;
            document.querySelector("#score").innerText = this.glitterFound;
            glitter.newGlitter();  // Also adds to the tail path
            // tail.addToTail(this.x, this.y)
            // console.log(tail.path)
        }
    }
    
    checkCollisions() {
        // Check for collisions with wall
        let lethalCollision = gameBoard.collisionWithWall(this.x, this.y, this.sprite);
        // TODO: if there is a collision show the cat falling over?

        // TODO: Check for collision with tail

        // Stop moving if found lethal collision
        if (lethalCollision === true && this.eventInterval) {
            clearInterval(this.eventInterval);
        }

        // Check for glitter element collisions
        this.glitterCollisions();

    }

    // If the cat is paused sit it down
    catPause(direction) {
        // Stop movement with pause key
        if (this.direction !== direction) {
            // Pick which direction to sit based on previous direction
            let oldDirectionChange = moves.directionChanges[this.direction];
            this.backgroundImage = oldDirectionChange.sitBackgroundImage;
            this.sprite.startAnimation(this.sitSprites);
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
                this.sprite.startAnimation(this.sprite.walkSprites);
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
