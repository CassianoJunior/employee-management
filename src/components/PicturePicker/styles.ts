import styled from 'styled-components/native';
import theme from '../../theme';

interface PictureSectionProps {
  bgColor: boolean;
}

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
