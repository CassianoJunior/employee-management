import { Search } from 'lucide-react-native';
import { DefaultScreen } from '../../components/DefaultScreen';
import theme from '../../theme';
import { Container, Input } from './styles';

const Home = () => {
  return (
    <DefaultScreen>
      <Container>
        <Search color={theme.colors.gray[300]} strokeWidth={1.3} />
        <Input placeholder="Buscar pelo nome, email..." />
      </Container>
    </DefaultScreen>
  );
};

export { Home };
