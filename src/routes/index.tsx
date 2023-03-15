import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AppRoutes } from './app.routes';

const Routes = () => {
  return (
    <NavigationContainer>
      <AppRoutes />
      <StatusBar style="light" />
    </NavigationContainer>
  );
};

export { Routes };
