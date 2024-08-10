import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEmptyGrid, Grid } from '../utils/gameOfLife';

const GRID_STATE_KEY = 'GRID_STATE';
const GAME_STARTED_KEY = 'GAME_STARTED';
const GRID_SIZE = 20;

const usePersistentGrid = () => {
  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid(GRID_SIZE));
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [hasTheGameStarted, setHasTheGameStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  const saveGridState = async (currentGrid: Grid, gameStarted: boolean) => {
    try {
      await AsyncStorage.setItem(GRID_STATE_KEY, JSON.stringify(currentGrid));
      await AsyncStorage.setItem(GAME_STARTED_KEY, JSON.stringify(gameStarted));
    } catch (error) {
      console.error('Failed to save grid state', error);
    }
  };

  const loadGridState = async () => {
    try {
      const savedGrid = await AsyncStorage.getItem(GRID_STATE_KEY);
      const savedGameStarted = await AsyncStorage.getItem(GAME_STARTED_KEY);
      if (savedGrid) {
        setGrid(JSON.parse(savedGrid));
      }
      if (savedGameStarted) {
        setHasTheGameStarted(JSON.parse(savedGameStarted));
      }
    } catch (error) {
      console.error('Failed to load grid state', error);
    }
  };

  const handleRestoreGrid = () => {
    loadGridState();
    setIsModalVisible(false);
  };

  const handleNewGrid = () => {
    setGrid(createEmptyGrid(GRID_SIZE));
    setHasTheGameStarted(false);
    setIsModalVisible(false);
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        const savedGrid = await AsyncStorage.getItem(GRID_STATE_KEY);
        const savedGameStarted = await AsyncStorage.getItem(GAME_STARTED_KEY);
        if (savedGrid && savedGameStarted && JSON.parse(savedGameStarted)) {
          setIsModalVisible(true);
        }
      } else if (nextAppState.match(/inactive|background/)) {
        setIsPlaying(false)
        saveGridState(grid, hasTheGameStarted);
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState, grid, hasTheGameStarted, saveGridState]);

  return {
    grid,
    setGrid,
    isModalVisible,
    setIsModalVisible,
    handleRestoreGrid,
    handleNewGrid,
    setHasTheGameStarted,
    hasTheGameStarted,
    setIsPlaying,
    isPlaying
  };
};

export default usePersistentGrid;