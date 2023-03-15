import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 50px;
  width: 80%;
  margin: auto;
  height: 40px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray[300],
})`
  width: 100%;
  height: 32px;
  font-size: 16px;
  color: ${theme.colors.gray[100]};
  margin-left: 8px;
`;
