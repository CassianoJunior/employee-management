import { Camera } from 'expo-camera';
import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';
import theme from '../../theme';

interface PictureSectionProps {
  bgColor: boolean;
}

interface InputProps {
  error: boolean;
}

export const Container = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 32px;
  position: relative;
`;

export const PictureSection = styled.View`
  width: 132px;
  height: 132px;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }: PictureSectionProps) =>
    !bgColor ? theme.colors.purple[100] : 'transparent'};
  border-radius: 132px;
  position: relative;
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
  margin: auto;
  gap: 24px;
`;

export const InputSection = styled.View`
  width: 100%;
  position: relative;
`;

export const Input = styled.TextInput`
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

export const InputMask = styled(TextInputMask)`
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

export const CameraSection = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  left: 0;
  background-color: red;
  z-index: 10;
  overflow: hidden;
`;

export const CameraComponent = styled(Camera)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const CloseCameraButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
`;

export const TakePictureButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  border-radius: 64px;
  background-color: ${theme.colors.gray[100]};
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 32px;
`;
