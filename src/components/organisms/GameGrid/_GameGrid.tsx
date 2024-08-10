import React, { FC } from 'react';
import { View } from 'react-native';
import { GridRow } from '../../molecules';
import { Grid } from '../../../utils/gameOfLife';
import styles from './_GameGridStyles';

interface IGameGridProps {
  grid: Grid;
  onCellToggle: (x: number, y: number) => void;
}

const _GameGrid: FC<IGameGridProps> = (props) => {
  const {
    grid,
    onCellToggle,
  } = props;

  return (
    <View style={styles.grid}>
      {grid.map((row, rowIndex) => (
        <GridRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          onCellToggle={onCellToggle}
        />
      ))}
    </View>
  );
};

export default _GameGrid;