import { TouchableOpacityProps } from 'react-native';
import theme from '../../theme';
import { ProfilePicture } from '../ProfilePicture';
import { Container, Email, Info, Name } from './styles';

interface EmployeeCardProps extends TouchableOpacityProps {
  name: string;
  email: string;
  profilePicture?: string;
}

const EmployeeCard = ({
  name,
  email,
  profilePicture,
  ...rest
}: EmployeeCardProps) => {
  return (
    <Container {...rest}>
      <ProfilePicture
        source={profilePicture}
        size={68}
        color={theme.colors.gray[100]}
      />
      <Info>
        <Name>{name}</Name>
        <Email>{email}</Email>
      </Info>
    </Container>
  );
};

export { EmployeeCard };
