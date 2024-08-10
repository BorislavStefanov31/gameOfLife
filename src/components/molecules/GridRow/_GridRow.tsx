import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { Cell } from '../../atoms';
import styles from './_GridRowStyles';

interface IGridRowProps {
  row: number[];
  rowIndex: number;
  onCellToggle: (x: number, y: number) => void;
  isPlaying: boolean;
}

const _GridRow: FC<IGridRowProps> = (props) => {
  const {
    row,
    rowIndex,
    onCellToggle,
    isPlaying,
  } = props;

  return (
    <View style={styles.row}>
      {row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          isAlive={cell === 1}
          onPress={() => onCellToggle(rowIndex, colIndex)}
          isPlaying={isPlaying}
        />
      ))}
    </View>
  );
};

export default _GridRow;