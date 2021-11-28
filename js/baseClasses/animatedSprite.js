class AnimatedSprite {
    sitSprites = 3;  // Number of sprites in the sitting sprite sheets
    walkSprites = 4;  // Number of sprites in the walking sprite sheets
    glitterSprites = 9;  // Number of sprites in the glitter sprite sheet

    constructor(htmlElement) {
        this.htmlElement = htmlElement;
        this.animationInterval;
    }

    startAnimation(sprites, time = 300) {
        this.stopAnimation();  // Make sure it's stopped first
        let widthOfSpriteSheet = 64 * (sprites - 1); 
        let xPosition = 0;  // Start x position for the htmlElement

        this.animationInterval = setInterval(() => {
            this.htmlElement.style.backgroundPosition = `-${xPosition}px 0px`;
      
            if (xPosition < widthOfSpriteSheet) {
                // Increment the position by the width of each sprite each time
                xPosition += 64;  // Size of each sprite
            } else {
                // Reset the position to show first sprite after the last one
                xPosition = 0;
            }
        }, time);
    }

    // Stop Animation
    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}
