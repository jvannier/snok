let tail = {
    path: [],  // Indices of tail nodes

    // Add tail element to path
    addToTail(x, y) {
        let xCoord = x * gameBoard.spriteSize;
        let yCoord = y * gameBoard.spriteSize;
        this.path.push({x: xCoord, y: yCoord});
        
        // Add element to game board
        gameBoard.board[x][y] = false;
        new Element("img", {
            src: "assets/tail/tail.png",
            alt: "tail element",
        }, xCoord, yCoord);
    },
}
