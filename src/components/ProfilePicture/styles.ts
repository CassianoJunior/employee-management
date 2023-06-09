import styled from 'styled-components/native';
import theme from '../../theme';
import { ThemeProps } from '../DefaultScreen/styles';

interface ImageSectionProps {
  size?: number;
  borderColor: string;
}
interface ImageProps {
  size?: number;
  source: { uri: string };
}
interface WithoutImageProps extends ThemeProps {
  size?: number;
  color?: string;
}

export const ImageSection = styled.View`
  width: ${(props: ImageSectionProps) => props.size}px;
  height: ${(props: ImageSectionProps) => props.size}px;
  border-radius: ${(props: ImageSectionProps) => props.size}px;
  border: 2px solid ${(props: ImageSectionProps) => props.borderColor};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Image = styled.Image`
  width: ${({ size = 68 }: ImageProps) => size}px;
  height: ${({ size = 68 }: ImageProps) => size}px;
  align-items: center;
  justify-content: center;
`;

export const WithoutImage = styled.View`
  width: ${({ size = 50 }: WithoutImageProps) => size}px;
  height: ${({ size = 50 }: WithoutImageProps) => size}px;
  border-radius: ${({ size = 50 }: WithoutImageProps) => size}px;
  border: 2px solid
    ${(props: WithoutImageProps) =>
      props.themeType === 'dark'
        ? theme.colors.purple[100]
        : theme.colors.zinc[800]};
  align-items: center;
  justify-content: center;
`;
