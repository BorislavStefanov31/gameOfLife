import { useState, useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEmptyGrid, Grid } from '../utils/gameOfLife';

const GRID_STATE_KEY = 'GRID_STATE';
const GRID_SIZE = 20;

const usePersistentGrid = () => {
  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid(GRID_SIZE));
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  const saveGridState = async (currentGrid: Grid) => {
    try {
      await AsyncStorage.setItem(GRID_STATE_KEY, JSON.stringify(currentGrid));
    } catch (error) {
      console.error('Failed to save grid state', error);
    }
  };

  const loadGridState = async () => {
    try {
      const savedGrid = await AsyncStorage.getItem(GRID_STATE_KEY);
      if (savedGrid) {
        setGrid(JSON.parse(savedGrid));
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
    setIsModalVisible(false);
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setIsModalVisible(true);
      } else if (nextAppState.match(/inactive|background/)) {
        saveGridState(grid);
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState, grid, saveGridState]);

  return {
    grid,
    setGrid,
    isModalVisible,
    setIsModalVisible,
    handleRestoreGrid,
    handleNewGrid,
  };
};

export default usePersistentGrid;