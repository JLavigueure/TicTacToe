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
    render: function() {

    },

    listeners: function() {
        let cells = Array.from(document.getElementsByClassName('cell'));
        cells.forEach(function(cell)  {
            cell.addEventListener('click', gameboard.click, { once: true })
        })
    },

    click: function() {
        console.log(event);
    },

    cache: function() {

    },


}