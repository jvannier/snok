let glitter = {
    sprite: null,  // Sprite of actual glitter
    animationInterval: null,  // Interval to update animation

    newXY() {
        // Generate new random x, y place in gameBoard for glitter
        let xRand = Math.floor(Math.random() * gameBoard.size);
        let yRand = Math.floor(Math.random() * gameBoard.size);
        return {xRand, yRand};
    },

    newGlitter() {
        // Grab spawn point
        let [spawnX, spawnY] = gameBoard.spawnPoint;

        // Make sure the spot isn't already taken on the board
        let xRand, yRand;
        do {
            ({xRand, yRand} = this.newXY());
        } while(
            // Don't spawn on at the spawn point
            (xRand === spawnX && yRand === spawnY)
            // Don't spawn on a spot that already has glitter or a tail element on it
            || gameBoard.board[xRand][yRand] !== null);

        // console.log(gameBoard.board[xRand][yRand])
        // TODO: Also make sure it isn't where the cat is
        // Note: Score is also how long the tail is

        // Add to gameBoard
        gameBoard.board[xRand][yRand] = true;

        // Make coordinates and glitter element
        let x = gameBoard.spriteSize * xRand;
        let y = gameBoard.spriteSize * yRand;
        let element = new Element("div", {
            // Attributes for accessibility
            role: "image",
            "aria-label": "glitter",
        }, x, y);
        element.backgroundImage = "assets/glitter/glitter.png";

        this.sprite = new AnimatedSprite(element.htmlElement);
        this.sprite.startAnimation(this.sprite.glitterSprites, 200);
    },

    // When removing glitter element also stop the animation interval
    removeGlitter(x, y) {
        document.querySelector(`#coord_${x}_${y}`).remove();
        this.sprite.stopAnimation();
    },
}
