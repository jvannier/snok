class AnimatedSprite {
    sitSprites = 3;  // Number of sprites in the sitting sprite sheets
    walkSprites = 4;  // Number of sprites in the walking sprite sheets
    sparkleSprites = 9;  // Number of sprites in the sparkle sprite sheet

    constructor(htmlElement) {
        this.htmlElement = htmlElement;
        this.animationInterval;
    }

    sit() {
        this.startAnimation(this.sitSprites, 300);
    }

    walk() {
        this.startAnimation(this.walkSprites, 300);
    }

    sparkle() {
        this.startAnimation(this.sparkleSprites, 200);
    }

    startAnimation(sprites, time) {
        this.stopAnimation();  // Make sure it's stopped first
        let widthOfSpriteSheet = 64 * (sprites - 1); 
        let xPosition = 0;  // Start x position for the htmlElement

        this.animationInterval = setInterval(() => {
            // If HTML element is no longer in the DOM, stop the interval
            if (document.querySelector(`#${this.htmlElement.id}`) === null && this.animationInterval) {
                clearInterval(this.animationInterval);
            }

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
