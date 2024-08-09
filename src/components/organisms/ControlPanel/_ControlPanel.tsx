import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../../atoms';

interface IControlPanelProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
}

const ControlPanel: FC<IControlPanelProps> = ({ isPlaying, onPlayPause, onStop }) => {
  return (
    <View style={styles.controlPanel}>
      <Button title={isPlaying ? "Pause" : "Play"} onPress={onPlayPause} />
      <Button title="Stop" onPress={onStop} />
    </View>
  );
};

const styles = StyleSheet.create({
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
});

export default ControlPanel;