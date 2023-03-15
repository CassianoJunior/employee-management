import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

export const PictureSection = styled.View`
  width: 132px;
  height: 132px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.purple[100]};
  border-radius: 132px;
  position: relative;
  border: 2px solid ${theme.colors.purple[800]};
`;

export const ChangePictureButton = styled.TouchableOpacity`
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  width: 280px;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const Input = styled.TextInput`
  width: 100%;
  background-color: ${theme.colors.purple[100]};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  position: relative;
`;

export const InputMask = styled(TextInputMask)`
  width: 100%;
  background-color: ${theme.colors.purple[100]};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
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
`;

export const ErrorMessage = styled.Text`
  color: ${theme.colors.red[400]};
  font-size: 12px;
  font-weight: bold;
  position: absolute;
`;
