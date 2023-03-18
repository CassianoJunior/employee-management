import styled from 'styled-components/native';
import theme from '../../theme';
import { ThemeProps } from '../DefaultScreen/styles';

interface PictureSectionProps extends ThemeProps {
  bgColor: boolean;
}

export const PictureSection = styled.View`
  width: 132px;
  height: 132px;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor, themeType }: PictureSectionProps) =>
    !bgColor
      ? themeType === 'dark'
        ? theme.colors.purple[100]
        : theme.colors.zinc[800]
      : 'transparent'};
  border-radius: 132px;
  position: relative;
`;

export const RightButton = styled.TouchableOpacity`
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

export const LeftButton = styled.TouchableOpacity`
  position: absolute;
  bottom: -8px;
  left: -8px;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;
