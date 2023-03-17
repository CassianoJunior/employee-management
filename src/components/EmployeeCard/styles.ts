import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled(Animated.View)`
  width: 48%;
  height: 176px;
  background-color: ${theme.colors.purple[500]};
  padding: 24px 12px;
  border-radius: 8px;
  margin: 8px 0;
`;

export const TouchableArea = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Info = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40%;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-family: ${theme.fonts.text};
  text-align: center;
  color: ${theme.colors.gray[100]};
`;

export const Email = styled.Text`
  font-size: 12px;
  font-family: ${theme.fonts.text};
  width: 100%;
  text-align: center;
  color: ${theme.colors.gray[100]};
`;
