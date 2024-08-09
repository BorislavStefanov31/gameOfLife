import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

interface CellProps {
  isAlive: boolean;
  onPress: () => void;
  isPlaying: boolean;
}

const Cell: React.FC<CellProps> = ({isAlive, onPress, isPlaying}) => {
  return (
    <TouchableOpacity
      style={[styles.cell, isAlive ? styles.liveCell : styles.deadCell]}
      onPress={() => !isPlaying && onPress()}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 15,
    height: 15,
    margin: 1,
  },
  liveCell: {
    backgroundColor: 'black',
  },
  deadCell: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default Cell;
