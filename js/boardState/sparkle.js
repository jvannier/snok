let sparkle = {
    sprite: null,  // Sprite of actual sparkle
    animationInterval: null,  // Interval to update animation

    newXY() {
        // Generate new random x, y place in gameBoard for sparkle
        let xRand = Math.floor(Math.random() * gameBoard.size);
        let yRand = Math.floor(Math.random() * gameBoard.size);
        return {xRand, yRand};
    },

    newSparkle() {
        // Grab spawn point
        let [spawnX, spawnY] = gameBoard.spawnPoint;

        // Make sure the spot isn't already taken on the board
        let xRand, yRand;
        do {
            ({xRand, yRand} = this.newXY());
        } while(
            // Don't spawn on at the spawn point
            (xRand === spawnX && yRand === spawnY)
            // Don't spawn on a spot that already has sparkle or a tail element on it
            || gameBoard.board[xRand][yRand] !== null);

        // console.log(gameBoard.board[xRand][yRand])
        // TODO: Also make sure it isn't where the cat is
        // Note: Score is also how long the tail is

        // Add to gameBoard ("true" means it's a sparkle element)
        gameBoard.board[xRand][yRand] = true;

        // Make coordinates and sparkle element
        let x = gameBoard.spriteSize * xRand;
        let y = gameBoard.spriteSize * yRand;
        let element = new Element("div", {
            // Attributes for accessibility
            role: "image",
            "aria-label": "sparkle",
        }, x, y);
        element.backgroundImage = "assets/sparkle/sparkle.png";

        this.sprite = new AnimatedSprite(element.htmlElement);
        this.sprite.sparkle();
    },

    // Remove sparkle HTML element if one exists at given coordinates
    removeSparkle(x, y) {
        let sparkleElement = document.querySelector(`#coord_${x}_${y}`);
        if (sparkleElement) {
            sparkleElement.remove();
        }
    },
}
