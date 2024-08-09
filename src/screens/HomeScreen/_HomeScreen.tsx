import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { GameGrid, ControlPanel } from '../../components/organisms';
import { createEmptyGrid, getNextGeneration, Grid } from '../../utils/gameOfLife';

const GRID_SIZE = 20;

const HomeScreen: React.FC = () => {
  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid(GRID_SIZE));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setGrid(prevGrid => getNextGeneration(prevGrid));
      }, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleCellToggle = (x: number, y: number) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      newGrid[x][y] = prevGrid[x][y] === 1 ? 0 : 1;
      return newGrid;
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setGrid(createEmptyGrid(GRID_SIZE));
  };

  return (
    <View style={styles.container}>
      <GameGrid grid={grid} onCellToggle={handleCellToggle} isPlaying={isPlaying} />
      <ControlPanel isPlaying={isPlaying} onPlayPause={handlePlayPause} onStop={handleStop} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;