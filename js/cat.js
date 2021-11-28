class Cat extends Element {
    constructor() {
        super("div",{
            // Attributes for accessibility
            role: "image",
            "aria-label": "cat",
        }, ...gameBoard.spawnPointCoordinates, 1);

        // Number of glitters found
        this.glitterFound = 0;
        
        this.sprite = new Sprite(this.element);  // Sprite to be animated
        this.direction;  // Direction moving, if any
        this.sitSprites = 3;  // Number of sprites in the sitting sprite sheets
        this.walkSprites = 4;  // Number of sprites in the walking sprite sheets
        this.backgroundImage = moves.sitLeft;  // Start sat left
        this.sprite.startAnimation(this.sitSprites);
        
        // Update coordinates once per 1 ms
        this.allowUserMovement();
    }

    // Check if found a glitter element
    glitterCollisions() {
        let hasGlitter = gameBoard.areCollisionsWithGlitter(this.x, this.y);
        if (hasGlitter > 0) {
            this.glitterFound += hasGlitter;
            document.querySelector("#score").innerText = this.glitterFound;
            glitter.newGlitter();
        }
    }
    
    // Change coordinates and gif based on if moving
    moveInDirection(direction) {
        // Stop movement with pause key
        if (direction === moves.pause && this.direction !== direction) {
            // Pick which direction to sit based on previous direction
            let oldDirectionChange = moves.directionChanges[this.direction];
            this.backgroundImage = oldDirectionChange.sitBackgroundImage;
            this.sprite.startAnimation(this.walkSprites);
        }

        // If the element is meant to be moving
        let directionChange = moves.directionChanges[direction]
        if (directionChange !== undefined) {
            this.x += directionChange.x;
            this.y += directionChange.y;
            this.backgroundImage = directionChange.backgroundImage;
            super.move();

            // Check for glitter element collisions
            this.glitterCollisions();

            // TODO: Check for collision with tail

            // If no change don't interrupt animation
            if (this.direction !== direction) {
                this.sprite.startAnimation(this.walkSprites);
            }
        }
        
        // Save direction so can tell if need to start animation over
        // which happens when changing direction or to/from sit/stand
        this.direction = direction;
    }

    // Allow the user to move this element
    allowUserMovement() {
        let direction;  // Make available otuside of event listener

        // Move using arrow keys
        document.addEventListener('keydown', function(e){
            // Ignore repeated keypresses (no change)
            if(e.repeat) return;

            // Only accept certain key presses
            if (e.key === moves.pause || moves.directionChanges[e.key] !== undefined) {
                direction = e.key;
            }
        })

        // Update location once per 1 ms
        setInterval(() => {
            this.moveInDirection(direction);
        }, 1);
    }
}
