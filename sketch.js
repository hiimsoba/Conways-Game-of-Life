// grid of cells
let grid = [];

// side length of a cell
let l = 10;

// number of rows and cols ( best comment in this whole code )
let rows, cols;

// keep track of whether the game is running or not
let running = false;

function setup() {
  // ?
  createCanvas(801, 601);

  // set up the number of rows and columns
  // so divide the height and width of the canvas by the length of a side of the cell
  rows = floor(height / l);
  cols = floor(width / l);

  // and create the grid
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      // empty of black, dead cells. oof.
      grid[i].push(new cell(i, j, false));
    }
  }
  // set the stroke and strokeweight here to avoid setting them each frame. unnecessary.
  stroke(255);
  strokeWeight(0.25);
}

function draw() {
  // black background... probably not necessary, but it's nice to have.
  background(0);

  // if the game is running, get the next generation
  if (running) {
    // so.. empty new generation!
    // like... the next grid.
    let next = [];
    for (let i = 0; i < rows; i++) {
      next[i] = [];
      // and for each cell, count its neighbors
      for (let j = 0; j < cols; j++) {
        let neighbors = neighborCount(grid, i, j);
        // and apply the rules of life
        if (neighbors == 2) {
          next[i][j] = new cell(i, j, grid[i][j].alive);
        } else if (neighbors == 3) {
          next[i][j] = new cell(i, j, true);
        } else {
          next[i][j] = new cell(i, j, false);
        }
      }
    }
    // and update the grid
    grid = next;
  }

  // display the grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
}

// some user interactivity with the game
// if the spacebar is pressed, switch the state of the game ( running or not )
function keyPressed() {
  if (key === ' ') {
    running = !running;
  }
}

// and whenever a user presses on a cell, it switches its state
function mousePressed() {
  if (!running) {
    let y = floor(mouseX / l);
    let x = floor(mouseY / l);
    // small index range check
    if (x >= 0 && y >= 0 && x < rows && y < cols) {
      grid[x][y].alive = !grid[x][y].alive;
    }
  }
}
