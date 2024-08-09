import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from '../../atoms';
import styles from './_ControlPanelStyles';

interface IControlPanelProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
}

const ControlPanel: FC<IControlPanelProps> = (props) => {
  const {
    isPlaying,
    onPlayPause,
    onStop
  } = props

  return (
    <View style={styles.controlPanel}>
      <Button title={isPlaying ? "Pause" : "Play"} onPress={onPlayPause} />
      <Button title="Stop" onPress={onStop} />
    </View>
  );
};

export default ControlPanel;