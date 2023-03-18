import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeContext } from '../../contexts/ThemeContext';

// Styled-Component
import { Container } from './styles';

interface ScreenComponentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DefaultScreen = ({ children, style }: ScreenComponentProps) => {
  const { theme } = useThemeContext();

  return (
    <Container style={style} themeType={theme}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Pressable onPressOut={Keyboard.dismiss}>
          <View>{children}</View>
        </Pressable>
      </KeyboardAvoidingView>
    </Container>
  );
};

export { DefaultScreen };
