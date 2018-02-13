window.app = app = {};

/* Model */

app.model = {
  board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  turn : 0,
  rowMap: { 'A': 0, 'B': 1, 'C': 2 },

  makeMove : function (piece, place) {
    this.setPiece(piece, place);
    this.turn++;
        
    if (this.turn % 2 === 0) {
      uiText = `It's X's turn!`;
    } else {
      uiText = `It's O's turn!`;
    };

    app.view.renderUiText(uiText);
  },

  setPiece : function (piece, place) {
    if(place.length === 2 ) {
      let row = this.rowMap[place[0]];
      let column = place[1];
  
      this.board[row][column] = piece;
      app.view.renderPlace(place);
    } else {
      console.error("Improper use of setPiece");
    }
  },

  getPiece : function(place) {

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
    console.table(app.model.board);
  
    document.getElementById('reset-button').addEventListener('click', (e)=>{
      e.preventDefault();
      console.log('Resetting board.');
    });
  
    let places = document.getElementsByClassName('place');
    
    Array.from(places).forEach(place => {
      app.view.renderPlace(place.id);

      place.addEventListener('click', function (e) {
        if(app.model.getPiece(place.id) === 0){
          app.controller.makeMove(place.id);
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
  },

};

app.controller = {
  
  /**
   *  Writes 1 or 2 to a place on the board model, given:
   *   piece -- Single character string 'X' or 'O'
   *   place -- Two character string representing the row and column ('A0', 'A1', 'A2', 'B0', etc....)
   */
  makeMove: function (place) {
    let model = app.model; //brevity

    let piece = (model.turn % 2) + 1; // places 1 (X) on even turns, 2 (O) on odd turns

    console.log('setting piece', piece, 'at place', place);
    if(place.length === 2 ) {

      model.makeMove(piece, place);

      console.table(model.board); // TODO delete
    } else {
      console.error('Something went wrong. Incorrect usage of app.controller.setPiece function.');
    }
  },

  reset : () => {
    app.model.turn = 0;
    ["A", "B", "C"].forEach(row => {
      [0, 1, 2].forEach(column => {
        app.model.setPiece(0, row+column);
      });
    });

    console.table(app.model.board);
  }

};