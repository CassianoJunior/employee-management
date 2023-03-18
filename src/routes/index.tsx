import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useThemeContext } from '../contexts/ThemeContext';
import { AppRoutes } from './app.routes';

const Routes = () => {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer>
      <AppRoutes />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
};

export { Routes };
