import { Plus, Search } from 'lucide-react-native';
import { ScrollView } from 'react-native';
import data from '../../../assets/MOCK_DATA.json';
import { DefaultScreen } from '../../components/DefaultScreen';
import { EmployeeCard } from '../../components/EmployeeCard';
import theme from '../../theme';
import { AddEmployee, Input, List, SearchBar, TextButton } from './styles';

const Home = () => {
  return (
    <DefaultScreen>
      <SearchBar>
        <Search color={theme.colors.gray[300]} strokeWidth={1.3} />
        <Input placeholder="Buscar pelo nome, email..." />
      </SearchBar>
      <AddEmployee>
        <Plus color={theme.colors.gray[100]} strokeWidth={1.5} />
        <TextButton>Adiconar funcionário</TextButton>
      </AddEmployee>
      <ScrollView>
        <List>
          {data.map((employee) => (
            <EmployeeCard
              key={employee.id}
              name={employee.name}
              email={employee.email}
            />
          ))}
        </List>
      </ScrollView>
    </DefaultScreen>
  );
};

export { Home };
