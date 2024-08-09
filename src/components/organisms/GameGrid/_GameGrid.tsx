import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GridRow } from '../../molecules';
import { Grid } from '../../../utils/gameOfLife';

interface GameGridProps {
  grid: Grid;
  onCellToggle: (x: number, y: number) => void;
  isPlaying: boolean;
}

const GameGrid: React.FC<GameGridProps> = ({ grid, onCellToggle, isPlaying }) => {
  return (
    <View style={styles.grid}>
      {grid.map((row, rowIndex) => (
        <GridRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          onCellToggle={onCellToggle}
          isPlaying={isPlaying}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'column',
  },
});

export default GameGrid;