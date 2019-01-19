// simple cell class
class cell {
  // i, j and state
  constructor(i, j, alive) {
    this.i = i;
    this.j = j;
    this.alive = alive;
  }

  // display the cell on the grid
  show() {
    // white if alive, black otherwise ( don't judge me for making the dead cells black )
    fill(this.alive ? 255 : 0);
    // and a rectangle at i, j * the side length
    rect(this.j * l, this.i * l, l, l);
  }
}

// count how many alive neighbors the cell at (i, j) has
function neighborCount(grid, i, j) {
  // will add 1 for each alive neighbor
  let sum = 0;
  // get all 8 neighbors, so offset i and j by [-1, 1]
  for (let ioff = -1; ioff <= 1; ioff++) {
    for (let joff = -1; joff <= 1; joff++) {
      // wrap around if you go over the edges
      let i1 = (i + ioff + rows) % rows;
      let j1 = (j + joff + cols) % cols;
      // and if the cell at [i1, j1] is alive, increase the sum
      if (grid[i1][j1].alive) {
        sum++;
      }
    }
  }
  // if the cell at [i, j] is alive, make sure to not take it into the sum
  if (grid[i][j].alive) {
    sum--;
  }
  // and return the number of alive neighbors
  // rip dead neighbors
  return sum;
}
