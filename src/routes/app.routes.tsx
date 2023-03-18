import { createStackNavigator } from '@react-navigation/stack';
import { ToggleTheme } from '../components/ToggleTheme';
import { useThemeContext } from '../contexts/ThemeContext';
import { EmployeeBadge } from '../screens/EmployeeBadge';
import { Home } from '../screens/Home';
import { RegisterEmployee } from '../screens/RegisterEmployee';
import appTheme from '../theme';

const Stack = createStackNavigator();

const AppRoutes = () => {
  const { theme } = useThemeContext();

  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor:
            theme === 'dark'
              ? appTheme.colors.gunmental[500]
              : appTheme.colors.gray[200],
          borderBottomWidth: 0,
        },
        headerTintColor:
          theme === 'dark'
            ? appTheme.colors.gray[100]
            : appTheme.colors.zinc[800],
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <ToggleTheme />,
      }}
    >
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'Funcionários',
        }}
      />
      <Stack.Screen
        name="register"
        component={RegisterEmployee}
        options={{
          title: 'Cadastrar funcionário',
        }}
      />
      <Stack.Screen name="details" component={EmployeeBadge} />
    </Stack.Navigator>
  );
};

export { AppRoutes };
