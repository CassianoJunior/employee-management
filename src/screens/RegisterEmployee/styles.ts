import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';
import { ThemeProps } from '../../components/DefaultScreen/styles';
import theme from '../../theme';

interface InputProps extends ThemeProps {
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

export const Input = styled.TextInput.attrs((props: InputProps) => ({
  placeholderTextColor:
    props.themeType === 'dark'
      ? theme.colors.gray[500]
      : theme.colors.gray[100],
}))`
  width: 100%;
  background-color: ${(props: InputProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[100]
      : theme.colors.zinc[800]};
  border-radius: 8px;
  ${(props: InputProps) =>
    props.error && `border: 2px solid ${theme.colors.red[400]};`}

  color: ${(props: InputProps) =>
    props.themeType === 'dark'
      ? theme.colors.zinc[800]
      : theme.colors.gray[100]};
  padding: 12px 16px;
  font-size: 16px;
  font-family: ${theme.fonts.text};
  position: relative;
`;

export const InputMask = styled(TextInputMask).attrs((props: InputProps) => ({
  placeholderTextColor:
    props.themeType === 'dark'
      ? theme.colors.gray[500]
      : theme.colors.gray[100],
}))`
  width: 100%;
  background-color: ${(props: InputProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[100]
      : theme.colors.zinc[800]};
  border-radius: 8px;
  ${(props: InputProps) =>
    props.error && `border: 2px solid ${theme.colors.red[400]};`}

  color: ${(props: InputProps) =>
    props.themeType === 'dark'
      ? theme.colors.zinc[800]
      : theme.colors.gray[100]};
  padding: 12px 16px;
  font-size: 16px;
  font-family: ${theme.fonts.text};
  position: relative;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[500]
      : theme.colors.purple[700]};
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
