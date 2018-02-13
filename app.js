window.app = app = {};

/* Model */
app.model = {
  board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  turn : 0,
  rowMap: { 'A': 0, 'B': 1, 'C': 2 },
  gameEnded: false,

  makeMove : function (piece, place) {
    this.setPiece(piece, place);

    //check if someone won
    let row = this.rowMap[place[0]];
    let column = place[1];

    if (this.checkRow(row, piece) || this.checkColumn(column, piece) || this.checkMajor(piece) || this.checkMinor(piece)) {
      if (this.turn % 2 === 0) {
        uiText = `X is the winner! O sucks!`;
      } else {
        uiText = `O is the winner! X sucks!`;
      };

      this.gameEnded = true;
  
      app.view.renderUiText(uiText);
    } else if (this.turn >= 8) {
      uiText = `It's a tie! Everyone sucks!`;
      app.view.renderUiText(uiText);
      this.gameEnded = true;

    } else {
      if(!this.gameEnded) {
        this.turn++;

        if (this.turn % 2 === 0) {
          uiText = `It's X's turn!`;
        } else {
          uiText = `It's O's turn!`;
        };
    
        app.view.renderUiText(uiText);
      }
    }

  },

  setPiece : function (piece, place) {
    if (place.length === 2 ) {
      let row = this.rowMap[place[0]];
      let column = place[1];
  
      this.board[row][column] = piece;
      app.view.renderPlace(place);
      
    } else {
      console.error("Improper use of setPiece");
    }
  },

  getPiece : function(place) {
    if (place.length === 2 ) {
      let row = this.rowMap[place[0]];
      let column = place[1];
  
      return this.board[row][column];
    }
  },

  checkRow : function (row, piece) {
    return (this.board[row][0] === piece && this.board[row][1] === piece && this.board[row][2] === piece);
  },

  checkColumn : function (column, piece) {
    return (this.board[0][column] === piece && this.board[1][column] === piece && this.board[2][column] === piece);
  },

  checkMajor : function (piece) {
    return (this.board[0][0] === piece && this.board[1][1] === piece && this.board[2][2] === piece);
  },

  checkMinor : function (piece) {
    return (this.board[0][2] === piece && this.board[1][1] === piece && this.board[2][0] === piece);
  }
};


/* View */
app.view = {
  init : (e) => {
  
    document.getElementById('reset-button').addEventListener('click', (e)=>{
      e.preventDefault();
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

    app.view.renderUiText(`It's X's turn!`);
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

    if(place.length === 2 ) {

      model.makeMove(piece, place);

    } else {
      console.error('Something went wrong. Incorrect usage of app.controller.setPiece function.');
    }
  },

  reset : () => {
    app.model.turn = 0;
    app.model.gameEnded = false;
    uiText = `It's X's turn!`;
    app.view.renderUiText(uiText);

    ["A", "B", "C"].forEach(row => {
      [0, 1, 2].forEach(column => {
        app.model.setPiece(0, row+column);
      });
    });

  }

};