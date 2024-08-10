import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import { View } from 'react-native';
import { GameGrid, ControlPanel } from '../../components/organisms';
import { createEmptyGrid, getNextGeneration, Grid } from '../../utils/gameOfLife';
import styles from './_HomeScreenStyles';

const GRID_SIZE = 20;

const _HomeScreen: FC = () => {
  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid(GRID_SIZE));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleCellToggle = useCallback((x: number, y: number) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      newGrid[x][y] = prevGrid[x][y] === 1 ? 0 : 1;
      return newGrid;
    });
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    setGrid(createEmptyGrid(GRID_SIZE));
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setGrid(prevGrid => getNextGeneration(prevGrid));
      }, 200);
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


  return (
    <View style={styles.container}>
      <GameGrid grid={grid} onCellToggle={handleCellToggle} isPlaying={isPlaying} />
      <ControlPanel isPlaying={isPlaying} onPlayPause={handlePlayPause} onStop={handleStop} />
    </View>
  );
};

export default _HomeScreen;