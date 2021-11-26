class Cat extends Image {
    constructor(x, y) {
        let url = "assets/cat/white_cat_sitting.png"
        let alt = "cat"
        let zIndex = 1
        super(url, alt, x, y, zIndex)
        
        this.sit = "assets/cat/white_cat_sitting.png"
        this.walk = "assets/cat/white_cat_walking.png"

        // Allow movement with arrow keys
        this.directionChanges = {
            "ArrowLeft": {  // West
                x: -1,
                y: 0,
                src: this.walk,  // TODO: Want a different one for each direction
            },
            "ArrowUp": {  // North
                x: 0,
                y: 1,
                src: this.walk,  // TODO: Want a different one for each direction
            },
            "ArrowRight": {  // East
                x: 1,
                y: 0,
                src: this.walk,  // TODO: Want a different one for each direction
            },
            "ArrowDown": {  // South
                x: 0,
                y: -1,
                src: this.walk,  // TODO: Want a different one for each direction
            },
            // TODO: Allow WASD movement, too?
        }

        // Update coordinates once per 1 ms
        this.allowUserMovement()
    }

    // Change coordinates and gif based on if moving
    moveInDirection(direction) {
        // start / stop movement with space
        if (direction === " ") {
            this.image.src = this.sit;
        }

        // If the image is meant to be moving
        let directionChange = this.directionChanges[direction]
        if (directionChange !== undefined) {
            this.x += directionChange.x;
            this.y += directionChange.y;
            this.image.src = directionChange.src;
        }
        super.move();
    }

    // Allow the user to move this image
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
        }, 1)
    }
}
