import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import { View } from 'react-native';
import { GameGrid, ControlPanel, RestoreModal } from '../../components/organisms';
import { createEmptyGrid, getNextGeneration } from '../../utils/gameOfLife';
import usePersistentGrid from '../../hooks/usePersistentGrid';
import styles from './_HomeScreenStyles';

const GRID_SIZE = 20;

const _HomeScreen: FC = () => {
  const {
    grid,
    setGrid,
    isModalVisible,
    handleRestoreGrid,
    handleNewGrid,
    setHasTheGameStarted,
    hasTheGameStarted,
    setIsPlaying,
    isPlaying
  } = usePersistentGrid();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleCellToggle = useCallback((x: number, y: number) => {

    if (!isPlaying && !hasTheGameStarted) {
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        newGrid[x][y] = prevGrid[x][y] === 1 ? 0 : 1;
        return newGrid;
      });
    }
  }, [setGrid, hasTheGameStarted, isPlaying]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
    if (!hasTheGameStarted) {
    setHasTheGameStarted(true);
    }
  }, [setIsPlaying, setHasTheGameStarted, hasTheGameStarted]);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    setHasTheGameStarted(false);
    setGrid(createEmptyGrid(GRID_SIZE));
  }, [setGrid, setIsPlaying, setGrid]);

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
      <GameGrid
        grid={grid}
        onCellToggle={handleCellToggle}
      />
      <ControlPanel
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onStop={handleStop}
        hasTheGameStarted={hasTheGameStarted}
      />
      <RestoreModal
        isVisible={isModalVisible}
        onRestore={handleRestoreGrid}
        onNew={handleNewGrid}
      />
    </View>
  );
};

export default _HomeScreen;