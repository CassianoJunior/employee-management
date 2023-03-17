import { Camera } from 'expo-camera';
import styled from 'styled-components/native';
import theme from '../../theme';

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
