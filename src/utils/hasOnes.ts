import { Grid } from "./gameOfLife";

export const hasOnes = (grid: Grid) => {
    for (let row of grid) {
      if (row.includes(1)) {
        return true;
      }
    }
    return false;
  };
