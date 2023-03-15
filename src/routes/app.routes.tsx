import { createStackNavigator } from '@react-navigation/stack';
import { Details } from '../screens/Details';
import { Home } from '../screens/Home';
import { Register } from '../screens/Register';

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'Funcionários',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          title: 'Cadastrar funcionário',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="details"
        component={Details}
        options={{
          title: 'Detalhes',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export { AppRoutes };
