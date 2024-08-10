import React, { FC, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import styles from './_CellStyles';

interface CellProps {
  isAlive: boolean;
  onPress: () => void;
}

const _Cell: FC<CellProps> = ({ isAlive, onPress }) => {
  const cellStyle = useMemo(() => {
    return [styles.cell, isAlive ? styles.liveCell : styles.deadCell];
  }, [isAlive]);

  return (
    <Pressable
      style={({ pressed }) => [
        ...cellStyle,
        pressed && localStyles.pressedCell
      ]}
      onPress={onPress}
    />
  );
};

const localStyles = StyleSheet.create({
  pressedCell: {
    opacity: 0.5,
  },
});

export default _Cell;