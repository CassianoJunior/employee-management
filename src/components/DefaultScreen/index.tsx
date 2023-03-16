import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

// Styled-Component
import { Container } from './styles';

interface ScreenComponentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DefaultScreen = ({ children, style }: ScreenComponentProps) => {
  return (
    <Container style={style}>
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
