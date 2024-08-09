import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Cell } from '../../atoms';


interface GridRowProps {
  row: number[];
  rowIndex: number;
  onCellToggle: (x: number, y: number) => void;
  isPlaying: boolean;
}

const GridRow: React.FC<GridRowProps> = ({
  row,
  rowIndex,
  onCellToggle,
  isPlaying,
}) => {
  return (
    <View style={styles.row}>
      {row.map((cell, colIndex) => (
        <Cell
          key={colIndex}
          isAlive={cell === 1}
          onPress={() => onCellToggle(rowIndex, colIndex)}
          isPlaying={isPlaying}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default GridRow;
