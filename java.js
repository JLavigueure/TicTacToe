let gameboard = {
    board: new Array(9), 
    boardLength: 9,
    turn: '',
    modalElements: [],
    DOM: [],
    buttons: [],
    twoPlayer: false,
    nameInputs: [],

    cacheDOM: function() { 
        let cache = document.querySelectorAll('.cell');
        return cache;
    },
    cacheModal: function() {
        modalElements = Array.from(document.querySelectorAll(".modalClass"));
        return modalElements;
    },
    cacheButtons: function() {
        return(Array.from(document.querySelectorAll('.mode')))
    },
    cacheNames: function() {
        return(Array.from(document.querySelectorAll('.playersInput')))
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
    change2Player: function() {
        // adjust HTML classes for css changes
        let selectedBtnClassList = Array.from(event.srcElement.classList);
        if(selectedBtnClassList.includes('selected')) {
            return 1;
        }
        for(let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].classList.remove('selected');
        }
        event.srcElement.classList.add('selected');
        // change javascript variable
        if(event.srcElement.innerHTML == 'CPU') {
            gameboard.twoPlayer = false;
            gameboard.nameInputs[1].classList.add('off');
            gameboard.nameInputs[1].value = '';
            gameboard.nameInputs[1].readOnly = true; }
        else { 
            gameboard.twoPlayer = true;
            gameboard.nameInputs[1].classList.remove('off'); 
            gameboard.nameInputs[1].readOnly = false;
        }
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
        // gameboard listeners
        for(let i = 0; i < this.boardLength; i++){
            gameboard.DOM[i].addEventListener('click', function() {
                if(gameboard.board[i]) {return};
                if(gameboard.turn == 'x') {
                    gameboard.board[i] = 'x';
                    gameboard.turn = 'o';
                } else {
                    gameboard.board[i] = 'o';
                    gameboard.turn = 'x';
                }
                gameboard.resetDOM();
                gameboard.render();
                gameboard.checkWinner();
                if(gameboard.turn == 'o' && gameboard.twoPlayer == false){
                    AI.takeTurn();
                    gameboard.turn = 'x';
            }
            });
        }
        // modal listeners
        this.modalElements[2].addEventListener('click', function() {
            gameboard.newGame();
        })
        // button listeners
        for(let i = 0; i < 2; i++) {
            this.buttons[i].addEventListener('click', function() {
                gameboard.change2Player();
            })
        }    
    },
    checkWinner: function() {
        // check 3x verticals
        for(let i = 0; i < 4; i++){
            if(gameboard.board[i] == gameboard.board[(i+3)] && gameboard.board[i] == gameboard.board[(i+6)] && gameboard.board[i]) {
                gameboard.displayWinner(gameboard.board[i]);
                return gameboard.board[i];
            } 
        }
        //check 3x horizontals
        for(let i = 0; i <= 6; i += 3){
            if(gameboard.board[i] == gameboard.board[(i+1)] && gameboard.board[i] == gameboard.board[(i+2)] && gameboard.board[i]){
                gameboard.displayWinner(gameboard.board[i]);
                return gameboard.board[i];
            }
        }
        //check 2x diagnols
        if(gameboard.board[0] == gameboard.board[4] && gameboard.board[0] == gameboard.board[8] && gameboard.board[0]){
            gameboard.displayWinner(gameboard.board[0]);
            return gameboard.board[0];
        }
        if(gameboard.board[2] == gameboard.board[4] && gameboard.board[2] == gameboard.board[6] && gameboard.board[2]){
            gameboard.displayWinner(gameboard.board[2]);
            return gameboard.board[2];
        }
        //check board array is not full 
        for(let i = 0; i < gameboard.board.length; i++){
            if(gameboard.board[i] == false) {
                return;
            }
        }
        gameboard.displayWinner('draw');
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
        this.buttons = gameboard.cacheButtons();
        this.DOM = gameboard.cacheDOM();
        this.nameInputs = gameboard.cacheNames();
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
    displayWinner: function(i) {
        this.openModal();
        // check if draw
        if(i == 'draw'){
            gameboard.modalElements[1].innerHTML = `It's a draw!`;
            return;
        }
        // check if cpu won
        if(this.twoPlayer != true && i == 'o'){
            gameboard.modalElements[1].innerHTML = `The winner is CPU`;
            return;
        }
        let nameInputs = [];
        nameInputs = this.cacheNames();
        // if x won, display name. If no name, display x
        if(i == 'x'){
            if(nameInputs[0].value != ''){
                gameboard.modalElements[1].innerHTML = `The winner is ${nameInputs[0].value}`;
                return;
            }
            gameboard.modalElements[1].innerHTML = `The winner is ${i}`;
            return;
        }
        // if o won, display name. If no name, display x
        if(i == 'o'){
            if(nameInputs[1].value != ''){
                gameboard.modalElements[1].innerHTML = `The winner is ${nameInputs[1].value}`;
                return;
            }
            gameboard.modalElements[1].innerHTML = `The winner is ${i}`;
            return;
        }
        return 1;
    },
}
let AI = {
    firstMove: function() {
        // if center is played
        if(gameboard.board[4] == 'x'){
            switch(this.randomInt(4)) {
                case 0: gameboard.DOM[0].click(); break;
                case 1: gameboard.DOM[2].click(); break;
                case 2: gameboard.DOM[6].click(); break;
                case 3: gameboard.DOM[8].click(); break;
            }
            return;
        }
        // if middles are playerd
        for(let i = 0; i < 4; i++) {
            if(gameboard.board[(2 * i) + 1] == 'x') {
                gameboard.DOM[4].click();
                return;
            }
        }
        // if corners are played
        if(gameboard.board[0] == 'x') {
            switch(this.randomInt(2)){
                case 0: gameboard.DOM[1].click(); break;
                case 1: gameboard.DOM[3].click(); break;
            }
            return;
        }
        if(gameboard.board[2] == 'x') {
            switch(this.randomInt(2)){
                case 0: gameboard.DOM[1].click(); break;
                case 1: gameboard.DOM[5].click(); break;
            }
            return;
        }
        if(gameboard.board[6] == 'x') {
            switch(this.randomInt(2)){
                case 0: gameboard.DOM[3].click(); break;
                case 1: gameboard.DOM[7].click(); break;
            }
            return;
        }
        if(gameboard.board[8] == 'x') {
            switch(this.randomInt(2)){
                case 0: gameboard.DOM[5].click(); break;
                case 1: gameboard.DOM[7].click(); break;
            }
            return;
        }

    },
    checkWinRows: function() {
        let centerCell;
        // for each row
        for(let i = 0; i < 3; i++) {
            centerCell = (3 * i) + 1;
            // check to see if two of three cells are filled
            let cellsFilled = 0;
            for(let j = -1; j < 2; j++) {
                if(gameboard.board[centerCell + j]) {
                    cellsFilled++;
                }
            }
            if(cellsFilled != 2){
                continue;
            }
            // check if two filled cells are the same, if so click cells
            if(gameboard.board[centerCell] == gameboard.board[centerCell - 1] ||
                gameboard.board[centerCell] == gameboard.board[centerCell + 1] ||
                gameboard.board[centerCell - 1] == gameboard.board[centerCell + 1]) {
                    for(let j = -1; j < 2; j++) {
                        gameboard.DOM[centerCell + j].click();
                    }
                    return 1;
                }
        }
    },
    checkWinColumns: function() {
        let centerCell;
        // for each column
        for(let i = 0; i < 3; i++){
            centerCell = (i + 3);
            // check to see if two of three cells are filled
            let cellsFilled = 0;
            for(let j = -3; j <= 3; j += 3){
                if(gameboard.board[centerCell + j]) {
                    cellsFilled++;
                }
            }
            if(cellsFilled != 2){
                continue;
            }
            // compare cells
            if(gameboard.board[centerCell] == gameboard.board[centerCell - 3] ||
                gameboard.board[centerCell] == gameboard.board[centerCell + 3] ||
                gameboard.board[centerCell - 3] == gameboard.board[centerCell + 3]) {
                    for(let j = -3; j <= 3; j += 3) {
                        gameboard.DOM[centerCell + j].click();
                    }
                    return 1;
                }
        }
    },
    checkWinDiagnols: function() {
        // check to see if two of three cells are filled for either diagnol
        let cellsFilledLeft = 0;
        let cellsFilledRight = 0;
        for(let i = 0; i <= 4; i += 2){
            if(gameboard.board[i * 2]){cellsFilledLeft++}
            if(gameboard.board[(i + 2)]){cellsFilledRight++}
        }
        // compare left cells
        if(cellsFilledLeft == 2) {
            if(gameboard.board[0] == gameboard.board[4] ||
                gameboard.board[4] == gameboard.board[8] ||
                gameboard.board[0] == gameboard.board[8]) {
                    for(let i = 0; i <= 4; i += 2){
                        gameboard.DOM[i * 2].click();
                    }
                    return 1;
                }
        }
        // compare right cells
        if(cellsFilledRight == 2) {
            if(gameboard.board[2] == gameboard.board[4] ||
                gameboard.board[4] == gameboard.board[6] ||
                gameboard.board[2] == gameboard.board[6]) {
                    for(let i = 0; i <= 4; i += 2){
                        gameboard.DOM[i + 2].click();
                    }
                    return 1;
            }
        }
    },
    randomMove: function() {
        let randomCell = this.randomInt(9);
        if(gameboard.board[randomCell] == ''){
            gameboard.DOM[randomCell].click();
            return 1;
        }
        else{this.randomMove()}
    },
    randomInt: function(max) {
        return Math.floor(Math.random() *  max);
    },
    takeTurn: function(){
        // check to see if first move of game
        let cellsFilled = 0;
        for(let i = 0; i < gameboard.board.length; i++){
            if(gameboard.board[i]){cellsFilled++}
            if(cellsFilled > 1){break}
        }
        if(cellsFilled == 1){
            AI.firstMove();
            return;
        }
        if(this.checkWinRows() == 1){return;}
        if(this.checkWinColumns() == 1){return;}
        if(this.checkWinDiagnols() == 1){return;}
        // check to see if all cells filled, if not random move
        cellsFilled = 0;
        for(let i = 0; i < gameboard.board.length; i++){
            if(gameboard.board[i]){cellsFilled++}
            if(cellsFilled == 9) {return;}
        }
        if(this.randomMove() == 1){return;}
    }
}
gameboard.init();