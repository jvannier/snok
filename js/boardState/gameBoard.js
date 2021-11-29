/*
 * Game Board containing a baord that is a list of lists (a 2D array)
 * containing the positions of sparkle and tail elements.
 *
 * - "true" on the board represents a sparkle element
 * - "false" represents a tail element
 * - "null" represents that no element is there
 */
let gameBoard = {
    board: [],
    // TODO: How do we know how big the board should be? -- Responsive
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

    // Remove the gameboard from the screen
    removeBoard() {
        let board = document.querySelector("#gameBoard")
        if (board) {
            board.remove();
        }
    },

    // Remove the element at the x, y indices on the board
    removeFromBoard(x, y) {
        // Get coordinates from indices in this.board
        let xCoord = x * gameBoard.spriteSize;
        let yCoord = y * gameBoard.spriteSize;

        // Remove sparkle from DOM if it's sparkle
        sparkle.removeSparkle(xCoord, yCoord);

        // Remove from board
        this.board[x][y] = null;
    },

    // If there is a collision with a wall stop taking user input and animation and show death
    isCollisionWithWall(x, y) {
        let max = (gameBoard.size - 1) * gameBoard.spriteSize;
        if (x < 0 || y < 0 || x >= max || y >= max) {
            return true;
        }
        return false;
    },

    // Check if there is a collision and if there is remove (or not) it from the board
    isCollision(x, y, remove = true) {
        let collision = this.board[x][y] === remove ? 1 : 0
        if (collision === 1 && remove === true) {
            this.removeFromBoard(x, y);

            // tail.addToTail(x, y) // TODO?
        }
        return collision;
    },

    // Return number of times given coordinates collide with a sparkle in the gameBoard
    areCollisionsWithSparkle(x, y) {
        // Note: sparkle is shown in the gameBoard by an element that is "true"
        if (x < 0 || y < 0) {
            return 0;  // Not a valid coordinate
        }
        let collisions = 0;
        let xCoord = x / this.spriteSize;
        let yCoord = y / this.spriteSize;
        if (x % this.spriteSize === 0 && y % this.spriteSize === 0) {
            // On exactly one square (so only need to check 1 tile)
            collisions += this.isCollision(xCoord, yCoord);
        } else if (x % this.spriteSize === 0) {
            // Is in the same row (so only need to check 2 tiles)
            yCoord = Math.floor(yCoord);

            // Check top-most tile could be colliding with
            collisions += this.isCollision(xCoord, yCoord);

            // Check the tile one down
            collisions += this.isCollision(xCoord, yCoord + 1);
        } else if (y % this.spriteSize === 0) {
            // Is in the same column (so only need to check 2 tiles)
            xCoord = Math.floor(xCoord);

            // Check the left-most tile could be colliding with
            collisions += this.isCollision(xCoord, yCoord);

            // Check the tile one down
            collisions += this.isCollision(xCoord + 1, yCoord);
        } else {
            // Is not in the same row or column (so need to check 4 tiles)
            xCoord = Math.floor(xCoord);
            yCoord = Math.floor(yCoord);
            collisions += this.isCollision(xCoord, yCoord);
            collisions += this.isCollision(xCoord + 1, yCoord);
            collisions += this.isCollision(xCoord, yCoord + 1);
            collisions += this.isCollision(xCoord + 1, yCoord + 1);
        }
        return collisions;
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
        document.querySelector("#scoreContainer").style.marginTop = (
            this.size * this.spriteSize + "px"
        );
    }
}