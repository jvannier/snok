class Cat extends Image {
    constructor(x, y) {
        let url = "assets/cat/white_cat_sitting.png"
        let alt = "cat"
        let zIndex = 1
        super(url, alt, x, y, zIndex)
        
        this.sit = "assets/cat/white_cat_sitting.png"
        this.walk = "assets/cat/white_cat_walking.png"

        // Update coordinates once per 1 ms
        this.allowUserMovement()
    }

    // Change coordinates and gif based on if moving
    moveInDirection(direction) {
        // If the image is meant to be moving
        if (direction !== null) {
            if(direction === 'west'){
                this.x-=1
            }
            if(direction === 'north'){
                this.y+=1
            }
            if(direction === 'east'){
                this.x+=1
            }
            if(direction === 'south'){
                this.y-=1
            }

            super.move()
            this.image.src = this.walk  // TODO: Want a different one per direction
        } else {
            this.image.src = this.sit
        }
    }

    // Allow the user to move this image
    allowUserMovement() {
        let direction;  // Make available otuside of event listener

        // Move using arrow keys
        document.addEventListener('keydown', function(e){
            // Ignore repeated keypresses (no change)
            if(e.repeat) return;
        
            // Move with arrow keys
            if(e.key === "ArrowLeft"){
                direction = "west"
            } else if(e.key === "ArrowUp"){
                direction = "north"
            } else if(e.key === "ArrowRight"){
                direction = "east"
            } else if(e.key === "ArrowDown"){
                direction = "south"
            // start / stop movement with space
            } else if(e.key === " ") {
                direction = null
            }
        })

        // Update location once per 1 ms
        setInterval(() => {
            this.moveInDirection(direction)
        }, 1)
    }
}
