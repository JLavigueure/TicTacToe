// create object for gameboard
// array for gameboard of length 9
// method that checks for winner
// iife method to render gameboard
// iife method that adds event listeners
// method to update gameboard array

// create factoryfunction for players objects

const gameboard = {
    board: new Array(new Array(3), new Array(3), new Array(3)),
    checkWinner: function() {
        for(let i = 0; i < 3; i++) {
            // check verticals
            if (gameboard.board[i][0] == gameboard.board[i][1] == gameboard.board[i][2]) {
                return gameboard.board[i][0];
            }
            // check horizontals
            if (gameboard.board[0][i] == gameboard.board[1][i] == gameboard.board[2][i]) {
                return gameboard.board[0][i];
            }
        }
        // check diagnols
        if (gameboard.board[0][0] == gameboard.board[1][1] == gameboard.baord[2][2] || gameboard.board [0][2] == gameboard.board[1][1] == gameboard.board[2][0]) {
            return gameboard.board[1][1];
        }
    },
    render: function() {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++) {
                
            }
        }
    },
    update: function () {

    },
    listeners: function () {

    }
}