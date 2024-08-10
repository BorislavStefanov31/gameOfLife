import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens';

const Stack = createStackNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game of Life">
        <Stack.Screen name="Game of Life" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;