import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import FlashMessage from 'react-native-flash-message';
import { Provider as ReactNativePaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components/native';
import { EmployeeContextProvider } from './src/contexts/EmployeeContext';
import { Routes } from './src/routes';
import theme from './src/theme';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <ReactNativePaperProvider>
        <EmployeeContextProvider>
          <Routes />
          <FlashMessage position="bottom" />
        </EmployeeContextProvider>
      </ReactNativePaperProvider>
    </ThemeProvider>
  );
}
