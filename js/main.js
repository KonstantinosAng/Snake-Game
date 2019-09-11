const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

let primary = '#AF1E2D';

let secondary = '#0066ff';

const grid = 32; // Grid of snake bodies
var lose = false; // check if collision with self is true
var isPaused = false; // Check if game is paused by user
let count = 0; // Count snake bodies
let score = 0; // Count score ( 200 = MaxScore)
let speed = 4; // Snake speed (0 = Max_Speed || 10 == Min_Speed)

//Create Snake elements
let snake = {
  x: grid * 5,
  y: grid * 5,
  vx: grid,
  vy: 0,
  cells: [],
  maxCells: 4,
};

// Create apple food
let apple = {
  x: grid * 10,
  y: grid * 10,
  radius: 16,
};

// Get Win Popup
var winPopup = document.getElementById('win');
var playagain = document.getElementById('playagain');

// Get Pause Popup
var pausePopup = document.getElementById('pause');

// Get lose popup
var popup = document.getElementById('popup');

// Main function
function Update() {
  // Update if there is no collision
  if (lose === false) {
    requestAnimationFrame(Update);
  }

  // Reduce snake speed
  if (++count < speed) {
    return;
  }

  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Start moving
  snake.x += snake.vx;
  snake.y += snake.vy;

  // Check if it goes outside the edges and reset
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  // Make Snake Bigger after eating
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // Draw food
  ctx.beginPath();
  ctx.arc(apple.x + apple.radius, apple.y + apple.radius, apple.radius, 0, 2 * Math.PI, true);
  ctx.fillStyle = secondary;
  ctx.fill();

  // Draw Snake
  ctx.fillStyle = primary;
  snake.cells.forEach(function (cell, index) {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // Check if snake ate food
    if (cell.x === apple.x && cell.y === apple.y) {

      // Increase Size
      snake.maxCells++;

      // Increase Score
      score++;

      // Redraw apple at random point
      apple.x = getRandomInt(0, 24) * grid;
      apple.y = getRandomInt(0, 14) * grid;
    }

    // Check if user won
    if (score === 5) {
      lose = true;
      win = true;
      winPopup.style.display = 'block';
      playagain.style.display = 'block';
    }

    // Check collision with self or bomb to reset the game
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        lose = true;
        popup.style.display = 'block';
        window.setTimeout(fadeout, 1000);
      }
    }
  });

  // Draw score
  ctx.font = '72px Helvetica';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.textAlign = 'center';
  ctx.fillText(score, canvas.width / 2, canvas.height / 2);
}

// Function to calculate random position of apple
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to fade out lose popup
function fadeout() {
  popup.style.display = 'none';
  window.location.reload();
}

// Button moves
document.addEventListener('keydown', function (evt) {
  // 37 = Left Key || 38 = Up Key || 39 = Right Key || 40 = Down || 32 = SpaceBar(Change Speed)
  // 13 = Enter Key (Pause Game)
  if (evt.which === 37 && snake.vx === 0) {
    snake.vx = -grid;
    snake.vy = 0;
  } else if (evt.which === 38 && snake.vy === 0) {
    snake.vy = -grid;
    snake.vx = 0;
  } else if (evt.which === 39 && snake.vx === 0) {
    snake.vx = grid;
    snake.vy = 0;
  } else if (evt.which === 40 && snake.vy === 0) {
    snake.vy = grid;
    snake.vx = 0;
  } else if (evt.which === 32) {
    if (speed === 10) {
      speed = 0;
    }

    speed = speed + 0.5;
  } else if (evt.which === 13) {
    if (!isPaused) {
      lose = true;
      isPaused = true;
      pausePopup.style.display = 'block';
    } else if (isPaused) {
      isPaused = false;
      lose = false;
      pausePopup.style.display = 'none';
      requestAnimationFrame(Update);
    }
  }
});

// Starts the game
requestAnimationFrame(Update);
