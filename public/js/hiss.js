// Store id of elements in html
var his = document.getElementById('snake_sound');
var logo = document.getElementById('logo');

// Variable for snake sound and source of file
var bleep = new Audio();
bleep.src = 'sounds/snakehiss.mp3';

// listen for clicks on snake logo
logo.addEventListener('click', hiss);

// Execute on click on logo
function hiss() {
  his.style.display = 'block';
  bleep.play();
  window.setTimeout(fadeout, 1550);
}
