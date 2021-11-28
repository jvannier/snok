class Sprite {
    constructor(element) {
        this.element = element;
        this.animationInterval;
    }

    startAnimation(sprites) {
        this.stopAnimation();  // Make sure it's stopped first
        let widthOfSpriteSheet = 64 * (sprites - 1); 
        let xPosition = 0;  // Start x position for the element

        this.animationInterval = setInterval(() => {
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
}
