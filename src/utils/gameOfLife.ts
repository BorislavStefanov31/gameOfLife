export type Cell = 0 | 1;
export type Grid = Cell[][];

// Creates an empty grid based on the size param
export const createEmptyGrid = (size: number): Grid => {
  return Array.from({ length: size }, () => Array(size).fill(0));
};

// Compute the next generation based on these rules https://rustwasm.github.io/book/game-of-life/rules.html
export const getNextGeneration = (grid: Grid): Grid => {
  const size = grid.length;
  const newGrid = createEmptyGrid(size);

  const getLiveNeighbors = (x: number, y: number): number => {
    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0],
      [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];
    return directions.reduce((acc, [dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < size && newY >= 0 && newY < size) {
        return acc + grid[newX][newY];
      }
      return acc;
    }, 0);
  };

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const liveNeighbors = getLiveNeighbors(x, y);
      if (grid[x][y] === 1) {
        newGrid[x][y] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
      } else {
        newGrid[x][y] = liveNeighbors === 3 ? 1 : 0;
      }
    }
  }

  return newGrid;
};