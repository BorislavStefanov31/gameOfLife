import React, { FC, useMemo } from 'react';
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
  } = props;

  const playPauseTitle = useMemo(() => (isPlaying ? "Pause" : "Play"), [isPlaying]);

  return (
    <View style={styles.controlPanel}>
      <Button title={playPauseTitle} onPress={onPlayPause} />
      <Button title="Stop" onPress={onStop} />
    </View>
  );
};

export default ControlPanel;