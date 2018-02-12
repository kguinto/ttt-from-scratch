/* Model */

window.model = {
  board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
};


/* View */
window.onload = (e) => {

  console.log('Loaded tic-tac-toe app');
  console.table(window.board);

  document.getElementById('reset-button').addEventListener('click', (e)=>{
    e.preventDefault();
    console.log('Resetting board.');
  });

  let places = document.getElementsByClassName('place');

  
  Array.from(places).forEach(place => {
      place.addEventListener('click', function (e) {
        window.controller.setPiece('X', this.id);
      });
    });

  
};


window.controller = {

  rowMap : { 'A': 0, 'B': 1, 'C': 2 },

  pieceMap : { 'X': 1, 'O': 2},
  
  /**
   *  Writes 1 or 2 to a place on the board model, given:
   *   piece -- Single character string 'X' or 'O'
   *   place -- Two character string representing the row and column ('A0', 'A1', 'A2', 'B0', etc....)
   */
  setPiece: function (piece, place) {
    console.log('setting piece', piece, 'at place', place);
    if(place.length === 2 && (piece === 'X' || piece === 'O') ) {
      let row = window.controller.rowMap[place[0]];
      let column = place[1];

      window.model.board[row][column] = window.controller.pieceMap[piece];
      console.table(window.model.board); // TODO delete
    } else {
      console.error('Something went wrong. Incorrect usage of window.controller.setPiece function.');
    }
  }

};