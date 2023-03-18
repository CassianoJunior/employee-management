import { TouchableOpacityProps } from 'react-native';
import { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { useThemeContext } from '../../contexts/ThemeContext';
import appTheme from '../../theme';
import { ProfilePicture } from '../ProfilePicture';
import { Container, Email, Info, Name, TouchableArea } from './styles';

interface EmployeeCardProps extends TouchableOpacityProps {
  name: string;
  email: string;
  profilePicture?: string | null;
}

const EmployeeCard = ({
  name,
  email,
  profilePicture,
  ...rest
}: EmployeeCardProps) => {
  const { theme } = useThemeContext();

  return (
    <Container
      layout={Layout}
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      themeType={theme}
    >
      <TouchableArea {...rest}>
        <ProfilePicture
          source={profilePicture}
          size={68}
          color={
            theme === 'dark'
              ? appTheme.colors.zinc[800]
              : appTheme.colors.gray[100]
          }
        />
        <Info>
          <Name>{name}</Name>
          <Email>{email}</Email>
        </Info>
      </TouchableArea>
    </Container>
  );
};

export { EmployeeCard };
