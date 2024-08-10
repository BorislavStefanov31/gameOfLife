import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../atoms';
import styles from './_ControlPanelStyles';

interface IControlPanelProps {
  hasTheGameStarted: boolean;
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
}

const ControlPanel: FC<IControlPanelProps> = (props) => {
  const {
    hasTheGameStarted,
    isPlaying,
    onPlayPause,
    onStop,
  } = props;

  const playPauseTitle = useMemo(() => (isPlaying ? "Pause" : "Play"), [isPlaying]);

  const showPausedText = useMemo(() => {
    return hasTheGameStarted && !isPlaying;
  }, [hasTheGameStarted, isPlaying]);
  

  return (
    <View style={styles.controlPanel}>
      <Button title={playPauseTitle} onPress={onPlayPause} />
      {showPausedText && (
        <Text style={{ alignSelf: 'center', color:'black' }}>The game is paused</Text>
      )}
      <Button title="Stop" onPress={onStop} />
    </View>
  );
};

export default ControlPanel;