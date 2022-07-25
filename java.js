// create object for gameboard
    // set array for game board
    // method for printing gameboard to screen.. render
    // make each block a div
    // method for adding listener evnts to all divs
    // method for adding input to array
// create factory function for players
    // variable to track score for best out of 3
    // variable to track players icon

let gameboard = {
    board: new Array(9), 
    boardLength: 9,
    turn: '',
    modalElements: [],
    DOM: [],

    cacheDOM: function() { 
        let cache = document.querySelectorAll('.cell');
        return cache;
    },
    cacheModal: function() {
        modalElements = Array.from(document.querySelectorAll(".modalClass"));
        return modalElements;
    },
    openModal: function() {
        for(let i = 0; i < this.modalElements.length; i++){
            this.modalElements[i].classList.add('show');
        }
    },
    closeModal: function() {
        gameboard.modalElements.forEach(element => {
            element.classList.remove('show');
        });
    },

    render: function() { 
        for(let i = 0; i < this.boardLength; i++){
            if(gameboard.board[i] == 'x') {
                let leftX = document.createElement('div');
                let rightX = document.createElement('div');
                leftX.classList.add('x', 'left');
                rightX.classList.add('x', 'right');
                gameboard.DOM[i].appendChild(leftX);
                gameboard.DOM[i].appendChild(rightX);
                continue;
            } else if(gameboard.board[i] == 'o') {
                let circle = document.createElement('div');
                circle.classList.add('circle');
                gameboard.DOM[i].appendChild(circle);
                continue;
            } 
        }
    }, 
    onClick: function(){
        for(let i = 0; i < this.boardLength; i++){
        // add event listeners
            gameboard.DOM[i].addEventListener('click', function() {
                if(gameboard.board[i]) {return};
                if(gameboard.turn == 'x') {
                    gameboard.board[i] = 'x';
                    gameboard.turn = 'o';
                } else {
                    gameboard.board[i] = 'o';
                    gameboard.turn = 'x';
                }
                console.log(gameboard.turn);
                console.log('player changed!')
                gameboard.resetDOM();
                gameboard.render();
                gameboard.checkWinner();
            });
        }
        this.modalElements[1].addEventListener('click', function() {
            gameboard.newGame();
        })
    },
    checkWinner: function() {
        // check 3x verticals
        for(let i = 0; i < 4; i++){
            if(gameboard.board[i] == gameboard.board[(i+3)] && gameboard.board[i] == gameboard.board[(i+6)] && gameboard.board[i]) {
                console.log(`Winner is ${gameboard.board[i]}`)
                gameboard.openModal();
                return gameboard.board[i];
            } 
        }
        //check 3x horizontals
        for(let i = 0; i <= 6; i += 3){
            if(gameboard.board[i] == gameboard.board[(i+1)] && gameboard.board[i] == gameboard.board[(i+2)] && gameboard.board[i]){
                console.log(`Winner is ${gameboard.board[i]}`)
                gameboard.openModal();
                return gameboard.board[i];
            }
        }
        //check 2x diagnols
        if(gameboard.board[0] == gameboard.board[4] && gameboard.board[0] == gameboard.board[8] && gameboard.board[0]){
            console.log(`Winner is ${gameboard.board[0]}`)
            gameboard.openModal();
            return gameboard.board[0];
        }
        if(gameboard.board[2] == gameboard.board[4] && gameboard.board[2] == gameboard.board[6] && gameboard.board[2]){
            console.log(`Winner is ${gameboard.board[2]}`)
            gameboard.openModal();
            return gameboard.board[2];
        }
        //check board array is full 
        for(let i = 0; i < gameboard.board.length; i++){
            if(gameboard.board[i] == false) {
                console.log('keep playing!')
                return;
            }
        }
        console.log(`its a draw!`);
        gameboard.openModal();
        return 'draw';
    },
    resetDOM: function() {
        for(let i = 0; i < this.boardLength; i++){
            while(gameboard.DOM[i].firstChild){
                gameboard.DOM[i].removeChild(gameboard.DOM[i].firstChild)
            }
        }
    },
    init: function() {
        // cache & reset DOM
        this.modalElements = gameboard.cacheModal();
        gameboard.DOM = gameboard.cacheDOM();
        // add listener events
        this.onClick();
        //reset game
        this.newGame();
    },
    newGame: function() {
        // reset board array
        for(let i = 0; i < gameboard.board.length; i++){
            gameboard.board[i] = '';
        }
        gameboard.resetDOM();
        // reset player to x
        gameboard.turn = 'x';
        gameboard.closeModal();
    },
}

gameboard.init();