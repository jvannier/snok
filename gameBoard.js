let gameBoard = {
    board: [],
    // TODO: How do we know how big the board should be?
    size: 10,
    spriteSize: 64,
    
    // get spawn point as indices in gameBoard
    get spawnPoint() {
        return [this.size/2, this.size/2];
    },

    // get spawn point in pixels
    get spawnPointCoordinates() {
        return this.spawnPoint.map(element => element * this.spriteSize);
    },

    // Return if the given coordinates already have glitter in the gameBoard
    isCollisionWithGlitter(x, y) {
        if (x < 0 || y < 0) {
            return;  // Not a valid coordinate
        }

        // TODO: This doesn't match the boxes properly
        let xCoord = Math.floor(x / this.spriteSize);
        let yCoord = Math.floor(y / this.spriteSize);

        return (this.board[xCoord][yCoord] ? true : false);
    },
    
    // Remove the element at the coordinate x, y from the board
    removeFromBoard(x, y) {
        let xBoardCoord = Math.floor(x / this.spriteSize);
        let yBoardCoord = Math.floor(y / this.spriteSize);

        // Remove from DOM
        let xCoord = xBoardCoord * gameBoard.spriteSize;
        let yCoord = yBoardCoord * gameBoard.spriteSize;
        document.querySelector(`#coord_${xCoord}_${yCoord}`).remove();

        // Remove from board
        this.board[xBoardCoord][yBoardCoord] = null;
    },

    makeBoard() {
        // Initialize gameBoard
        this.board = [];
        let row;
        for(let i = 0; i < this.size; i++) {
            row = [];
            for(let i = 0; i < this.size; i++) {
                row.push(null);
            }
            this.board.push(row);
        }
        
        // Set height and width of game board HTML element 'main'
        let main = document.querySelector("main");
        main.style.height = this.size * this.spriteSize + "px";
        main.style.width = this.size * this.spriteSize + "px";

        // Move score to bottom of the screen
        document.querySelector("#scoreContainer").style.marginTop = this.size * this.spriteSize + "px";
    }
}