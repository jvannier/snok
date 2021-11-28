// Create GameBoard
gameBoard.makeBoard();

// Create the snok (which is a cat) in the middle (roughly) of the board
new Cat();

// Create 4 glitters
// TODO: find new asset
for(let i = 0; i < 4; i++) {
    glitter.newGlitter();
}
console.log(gameBoard.board);

// TODO: Create the scoreboard
