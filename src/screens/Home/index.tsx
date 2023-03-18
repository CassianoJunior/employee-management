import { useNavigation } from '@react-navigation/native';
import { Plus, Search } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { DefaultScreen } from '../../components/DefaultScreen';
import { EmployeeCard } from '../../components/EmployeeCard';
import { useEmployeeContext } from '../../contexts/EmployeeContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import appTheme from '../../theme';
import { AddEmployee, Input, List, SearchBar, TextButton } from './styles';

const Home = () => {
  const navigation = useNavigation();

  const { employees, deleteEmployee, searchEmployee } = useEmployeeContext();

  const [search, setSearch] = useState<string>('');

  const handleAddEmployee = useCallback(() => {
    navigation.navigate('register');
  }, [navigation]);

  const handleDelete = (id: string) => {
    deleteEmployee(id);
    showMessage({
      message: 'Funcionário excluído com sucesso!',
      type: 'success',
      floating: true,
      titleStyle: {
        alignContent: 'center',
      },
    });
  };

  const employeesToShow =
    search.length > 0 ? searchEmployee(search) : employees;

  const { theme } = useThemeContext();

  return (
    <DefaultScreen>
      <SearchBar>
        <Search color={appTheme.colors.gray[500]} strokeWidth={1.3} />
        <Input
          placeholder="Buscar pelo nome, email..."
          value={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
        />
      </SearchBar>
      <AddEmployee onPress={handleAddEmployee}>
        <Plus
          color={
            theme === 'dark'
              ? appTheme.colors.gray[100]
              : appTheme.colors.zinc[800]
          }
          strokeWidth={1.5}
        />
        <TextButton themeType={theme}>Adicionar funcionário</TextButton>
      </AddEmployee>
      <ScrollView>
        <List>
          {employeesToShow.map((employee) => (
            <EmployeeCard
              key={employee.id}
              name={employee.name}
              email={employee.email}
              profilePicture={employee.profilePicture}
              onPress={() =>
                navigation.navigate('details', { id: employee.id })
              }
              onLongPress={() =>
                Alert.alert('Atenção', 'Deseja excluir?', [
                  {
                    text: 'Não',
                    style: 'cancel',
                  },
                  {
                    text: 'Sim',
                    style: 'destructive',
                    onPress: () => handleDelete(employee.id),
                  },
                ])
              }
            />
          ))}
        </List>
      </ScrollView>
    </DefaultScreen>
  );
};

export { Home };
