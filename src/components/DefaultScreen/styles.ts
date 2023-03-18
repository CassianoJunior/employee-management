import styled from 'styled-components/native';
import { themeType } from '../../contexts/ThemeContext';
import theme from '../../theme';

export interface ThemeProps {
  themeType: themeType;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${(props: ThemeProps) =>
    props.themeType === 'light'
      ? theme.colors.gray[200]
      : theme.colors.gunmental[500]};
`;
