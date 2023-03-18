import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import FlashMessage from 'react-native-flash-message';
import { Provider as ReactNativePaperProvider } from 'react-native-paper';
import { EmployeeContextProvider } from './src/contexts/EmployeeContext';
import { ThemeContextProvider } from './src/contexts/ThemeContext';
import { Routes } from './src/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeContextProvider>
      <ReactNativePaperProvider>
        <EmployeeContextProvider>
          <Routes />
          <FlashMessage position="bottom" />
        </EmployeeContextProvider>
      </ReactNativePaperProvider>
    </ThemeContextProvider>
  );
}
