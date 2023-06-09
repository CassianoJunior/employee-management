import MaskInput from 'react-native-mask-input';
import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';
import { ThemeProps } from '../../components/DefaultScreen/styles';
import theme from '../../theme';

export const Badge = styled.View`
  align-items: center;
  justify-content: space-between;
  height: 544px;
  width: 320px;
  background-color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[500]
      : theme.colors.purple[700]};
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  z-index: 0;
  gap: 32px;
  padding: 112px 0 32px;
  margin: 0 auto;
`;

export const BadgeHole = styled.View`
  position: absolute;
  top: 40px;
  width: 60px;
  height: 12px;
  border-radius: 40px;
  background-color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.gunmental[500]
      : theme.colors.gray[200]};
`;

export const BadgeCircle = styled.View`
  height: 536px;
  width: 536px;
  border-radius: 536px;
  background-color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.gray[100]
      : theme.colors.zinc[900]};
  position: absolute;
  bottom: -268px; // 536 / 2
`;

export const LeftButtonIcon = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
`;

export const RightButtonIcon = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
`;

export const BadgeContent = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px 0;
`;

export const BadgeHeader = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const BadgeName = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[900]
      : theme.colors.gray[100]};
  font-family: ${theme.fonts.heading};
`;

export const BadgeNameInput = styled.TextInput`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[900]
      : theme.colors.gray[100]};
  font-family: ${theme.fonts.heading};
`;

export const BadgeJobTitle = styled.Text`
  color: ${theme.colors.gray[500]};
  font-size: 24px;
  font-family: ${theme.fonts.text};
`;

export const BadgeJobTitleInput = styled.TextInput`
  text-align: center;
  color: ${theme.colors.gray[500]};
  font-size: 24px;
  font-family: ${theme.fonts.text};
`;

export const Info = styled.View`
  flex-direction: column;
  gap: 4px;
`;

export const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  text-align: start;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[900]
      : theme.colors.gray[100]};
  font-family: ${theme.fonts.text};
`;

export const InfoInput = styled.TextInput`
  font-size: 16px;
  height: 24px;
  color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[900]
      : theme.colors.gray[100]};
  font-family: ${theme.fonts.text};
`;

export const InfoInputMask = styled(TextInputMask)`
  font-size: 16px;
  height: 24px;
  color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[900]
      : theme.colors.gray[100]};
  font-family: ${theme.fonts.text};
`;

export const InfoInputMaskDate = styled(MaskInput)`
  font-size: 16px;
  height: 24px;
  color: ${(props: ThemeProps) =>
    props.themeType === 'dark'
      ? theme.colors.purple[900]
      : theme.colors.gray[100]};
  font-family: ${theme.fonts.text};
`;
