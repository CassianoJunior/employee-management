import styled from 'styled-components/native';
import theme from '../../theme';

export const SearchBar = styled.View`
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

export const AddEmployee = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: ${theme.colors.zinc[900]};
  border-radius: 50px;
  width: 80%;
  margin: 32px auto 8px;
  height: 40px;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  color: ${theme.colors.gray[100]};
  margin-left: 8px;
`;

export const List = styled.View`
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;