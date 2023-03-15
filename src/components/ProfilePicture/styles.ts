import styled from 'styled-components/native';
import theme from '../../theme';

interface ImageProps {
  size?: number;
  source: string;
}
interface WithoutImageProps {
  size?: number;
}

export const Container = styled.Image``;

export const WithoutImage = styled.View`
  width: ${({ size }: WithoutImageProps) => size}px;
  height: ${({ size }: WithoutImageProps) => size}px;
  border-radius: ${({ size }: WithoutImageProps) => size}px;
  border: 1px solid ${theme.colors.gray[300]};
  align-items: center;
  justify-content: center;
`;
