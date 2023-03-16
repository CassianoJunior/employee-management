import { TouchableOpacityProps } from 'react-native';
import { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import theme from '../../theme';
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
  return (
    <Container
      layout={Layout}
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
    >
      <TouchableArea {...rest}>
        <ProfilePicture
          source={profilePicture}
          size={68}
          color={theme.colors.gray[100]}
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
