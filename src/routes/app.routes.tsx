import { createStackNavigator } from '@react-navigation/stack';
import { EmployeeBadge } from '../screens/EmployeeBadge';
import { Home } from '../screens/Home';
import { Register } from '../screens/Register';
import theme from '../theme';

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.purple[700],
          borderBottomWidth: 0,
        },
        headerTintColor: theme.colors.gray[100],
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
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
        component={Register}
        options={{
          title: 'Cadastrar funcionário',
        }}
      />
      <Stack.Screen name="details" component={EmployeeBadge} />
    </Stack.Navigator>
  );
};

export { AppRoutes };
