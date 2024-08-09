import React, { FC } from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './_CellStyles';

interface CellProps {
  isAlive: boolean;
  onPress: () => void;
  isPlaying: boolean;
}

const _Cell: FC<CellProps> = ({isAlive, onPress, isPlaying}) => {
  return (
    <TouchableOpacity
      style={[styles.cell, isAlive ? styles.liveCell : styles.deadCell]}
      onPress={() => !isPlaying && onPress()}
    />
  );
};

export default _Cell;
