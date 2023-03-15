import { ProfilePicture } from '../ProfilePicture';
import { Container, Email, Info, Name } from './styles';

interface EmployeeCardProps {
  name: string;
  email: string;
  profilePicture?: string;
}

const EmployeeCard = ({ name, email, profilePicture }: EmployeeCardProps) => {
  return (
    <Container>
      <ProfilePicture source={profilePicture} />
      <Info>
        <Name>{name}</Name>
        <Email>{email}</Email>
      </Info>
    </Container>
  );
};

export { EmployeeCard };
