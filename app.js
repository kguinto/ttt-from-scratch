/* Model */
window.board =
[[ ' ', ' ', ' '],
 [ ' ', ' ', ' '],
 [ ' ', ' ', ' ']]; 

/* View */
window.onload = (e) => {

  console.log('Loaded tic-tac-toe app');

  document.getElementById('reset-button').addEventListener('click', (e)=>{
    e.preventDefault();
    console.log('Resetting board.');
  });
};


window.controller = {



};