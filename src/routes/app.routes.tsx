import { createStackNavigator } from '@react-navigation/stack';
import { Details } from '../screens/Details';
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
          backgroundColor: theme.colors.zinc[800],
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
      <Stack.Screen
        name="details"
        component={Details}
        options={{
          title: 'Detalhes',
        }}
      />
    </Stack.Navigator>
  );
};

export { AppRoutes };
