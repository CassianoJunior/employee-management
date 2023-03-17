import styled from 'styled-components/native';
import theme from '../../theme';

export interface Props {}

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.purple[700]};
  padding: 32px 0;
`;
