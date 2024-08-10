import React, { FC, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import styles from './_CellStyles';

interface CellProps {
  isAlive: boolean;
  onPress: () => void;
  isPlaying: boolean;
}

const _Cell: FC<CellProps> = ({ isAlive, onPress, isPlaying }) => {
  const cellStyle = useMemo(() => {
    return [styles.cell, isAlive ? styles.liveCell : styles.deadCell];
  }, [isAlive]);

  const handlePress = useCallback(() => {
    if (!isPlaying) {
      onPress();
    }
  }, [isPlaying]);

  return (
    <Pressable
      style={({ pressed }) => [
        ...cellStyle,
        pressed && localStyles.pressedCell
      ]}
      onPress={handlePress}
    />
  );
};

const localStyles = StyleSheet.create({
  pressedCell: {
    opacity: 0.5,
  },
});

export default _Cell;