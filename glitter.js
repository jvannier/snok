let glitter = {
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
            // Don't spawn on a spot that already has glitter on it
            || gameBoard.board[xRand][yRand] === true);

        // TODO: Also make sure it isn't where the cat is

        // Add to gameBoard
        gameBoard.board[xRand][yRand] = true;

        // Make coordinates and glitter element
        let x = gameBoard.spriteSize * xRand;
        let y = gameBoard.spriteSize * yRand;
        return new Element("img", {
            src: "assets/glitter/glitter.png",
            alt: "glitter",
        }, x, y)
    },
}
