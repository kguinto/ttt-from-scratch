/* Model */
window.board =
[[ ' ', ' ', ' '],
 [ ' ', ' ', ' '],
 [ ' ', ' ', ' ']]; 

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
        console.log(this);
      });
    });

  
};


window.controller = {

};