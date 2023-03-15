import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 48%;
  padding: 24px 12px;
  background-color: ${theme.colors.zinc[900]};
  border-radius: 8px;
  height: 176px;
  margin: 8px 0;
`;

export const Info = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40%;
`;

export const Name = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${theme.colors.gray[100]};
`;

export const Email = styled.Text`
  font-size: 12px;
  width: 100%;
  text-align: center;
  color: ${theme.colors.gray[500]};
`;
