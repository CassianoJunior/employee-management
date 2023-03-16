import FlashMessage from 'react-native-flash-message';
import { ThemeProvider } from 'styled-components/native';
import { EmployeeContextProvider } from './src/contexts/EmployeeContext';
import { Routes } from './src/routes';
import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <EmployeeContextProvider>
        <Routes />
        <FlashMessage position="bottom" />
      </EmployeeContextProvider>
    </ThemeProvider>
  );
}
