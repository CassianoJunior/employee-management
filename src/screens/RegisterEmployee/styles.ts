import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';
import theme from '../../theme';

interface InputProps {
  error: boolean;
}

export const Container = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 32px;
  gap: 32px;
  position: relative;
`;

export const Form = styled.View`
  width: 280px;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 24px;
`;

export const InputSection = styled.View`
  width: 100%;
  position: relative;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray[500],
})`
  width: 100%;
  background-color: ${theme.colors.purple[100]};
  border-radius: 8px;
  ${(props: InputProps) =>
    props.error && `border: 2px solid ${theme.colors.red[400]};`}

  padding: 12px 16px;
  font-size: 16px;
  font-family: ${theme.fonts.text};
  position: relative;
`;

export const InputMask = styled(TextInputMask).attrs({
  placeholderTextColor: theme.colors.gray[500],
})`
  width: 100%;
  background-color: ${theme.colors.purple[100]};
  border-radius: 8px;
  ${(props: InputProps) =>
    props.error && `border: 2px solid ${theme.colors.red[400]};`}
  padding: 12px 16px;
  font-size: 16px;
  font-family: ${theme.fonts.text};
  position: relative;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.purple[500]};
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 32px;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  color: ${theme.colors.gray[100]};
  font-weight: bold;
  font-family: ${theme.fonts.heading};
`;

export const ErrorMessage = styled.Text`
  color: ${theme.colors.red[400]};
  font-size: 16px;
  font-family: ${theme.fonts.text};
  position: absolute;
  bottom: -20px;
  left: 8px;
`;
