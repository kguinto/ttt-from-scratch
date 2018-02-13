window.app = app = {};

/* Model */

app.model = {
  board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  turn : 0,
  rowMap: { 'A': 0, 'B': 1, 'C': 2 },

  setPiece: function (piece, place) {
    if(place.length === 2 ) {
      let row = this.rowMap[place[0]];
      let column = place[1];
  
      this.board[row][column] = piece;
  
      app.view.renderPlace(place);
    } else {
      console.error("Improper use of setPiece");
    }
  },

  getPiece: function(place) {

    if(place.length === 2 ) {
      let row = this.rowMap[place[0]];
      let column = place[1];
  
      return this.board[row][column];
    }
  },

  uiText: `It's X's turn!`,

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
      app.view.renderPlace(place.id);

      place.addEventListener('click', function (e) {
        if(app.model.getPiece(place.id) === 0){
          app.controller.setPiece(place.id);
        }
      });
    });

    document.getElementById('reset-button').addEventListener('click', app.controller.reset);

    app.view.renderUiText(app.model.uiText);
  },

  renderUiText : (text) => {
    document.getElementById('ui-text').innerText = text;
  },

  renderPlace : (place) => {
    let pieceMap = ['', 'X', 'O'];
    let piece = pieceMap[app.model.getPiece(place)];

    document.getElementById(place).innerHTML = `<span class="piece">${piece}<span>`;

  }
};

app.controller = {
  
  /**
   *  Writes 1 or 2 to a place on the board model, given:
   *   piece -- Single character string 'X' or 'O'
   *   place -- Two character string representing the row and column ('A0', 'A1', 'A2', 'B0', etc....)
   */
  setPiece: function (place) {
    let model = app.model; //brevity

    let piece = (model.turn % 2) + 1; // places 1 (X) on even turns, 2 (O) on odd turns

    console.log('setting piece', piece, 'at place', place);
    if(place.length === 2 ) {

      model.setPiece(piece, place);
      model.turn++;

      console.table(model.board); // TODO delete
    } else {
      console.error('Something went wrong. Incorrect usage of app.controller.setPiece function.');
    }
  },

  reset : () => {
    
  }

};