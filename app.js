window.app = app = {};

/* Model */
app.model = {
  board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],

  rowMap : { 'A': 0, 'B': 1, 'C': 2 },

  pieceMap : { 'X': 1, 'O': 2},
};


/* View */
app.view = {
  init : (e) => {
    console.log('Loaded tic-tac-toe app');
    console.table(app.board);
  
    document.getElementById('reset-button').addEventListener('click', (e)=>{
      e.preventDefault();
      console.log('Resetting board.');
    });
  
    let places = document.getElementsByClassName('place');
    
    Array.from(places).forEach(place => {
      place.addEventListener('click', function (e) {
        app.controller.setPiece('X', this.id);
      });
    });
  }
};






app.controller = {
  
  /**
   *  Writes 1 or 2 to a place on the board model, given:
   *   piece -- Single character string 'X' or 'O'
   *   place -- Two character string representing the row and column ('A0', 'A1', 'A2', 'B0', etc....)
   */
  setPiece: function (piece, place) {
    console.log('setting piece', piece, 'at place', place);
    if(place.length === 2 && (piece === 'X' || piece === 'O') ) {
      let row = app.model.rowMap[place[0]];
      let column = place[1];

      app.model.board[row][column] = app.model.pieceMap[piece];
      console.table(app.model.board); // TODO delete
    } else {
      console.error('Something went wrong. Incorrect usage of app.controller.setPiece function.');
    }
  }

};