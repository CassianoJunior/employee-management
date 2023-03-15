import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';

// Styled-Component
import { Container } from './styles';

interface ScreenComponentProps {
  children?: React.ReactNode;
}

const DefaultScreen = ({ children }: ScreenComponentProps) => {
  return (
    <Container>
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
