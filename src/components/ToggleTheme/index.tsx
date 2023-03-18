import { Moon, Sun } from 'lucide-react-native';
import { View } from 'react-native';
import { Switch } from 'react-native-paper';
import { useThemeContext } from '../../contexts/ThemeContext';
import appTheme from '../../theme';

const ToggleTheme = () => {
  const { theme, toggleTheme } = useThemeContext();

  const isDarkTheme = theme === 'light';

  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}
    >
      <Moon
        color={
          theme === 'dark'
            ? appTheme.colors.gray[200]
            : appTheme.colors.zinc[800]
        }
      />
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      <Sun
        color={
          theme === 'dark'
            ? appTheme.colors.gray[200]
            : appTheme.colors.zinc[800]
        }
      />
    </View>
  );
};

export { ToggleTheme };
