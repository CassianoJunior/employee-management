import styled from 'styled-components/native';
import theme from '../../theme';

interface ImageProps {
  size?: number;
  source: string;
  color?: string;
}
interface WithoutImageProps {
  size?: number;
  color?: string;
}

export const Image = styled.Image`
  width: ${({ size }: ImageProps) => size}px;
  height: ${({ size }: ImageProps) => size}px;
  border-radius: ${({ size }: ImageProps) => size}px;
  border: 1px solid
    ${({ color }: ImageProps) => color || theme.colors.gray[100]};
  align-items: center;
  justify-content: center;
`;

export const WithoutImage = styled.View`
  width: ${({ size }: WithoutImageProps) => size}px;
  height: ${({ size }: WithoutImageProps) => size}px;
  border-radius: ${({ size }: WithoutImageProps) => size}px;
  border: 1px solid ${theme.colors.gray[300]};
  align-items: center;
  justify-content: center;
`;
