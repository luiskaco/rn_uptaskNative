// Primera linea navegacion
import 'react-native-gesture-handler';
import React from 'react';

// Importando navegacion
import { NavigationContainer } from '@react-navigation/native';
// Importamos el tipo de ventana
import { createStackNavigator } from '@react-navigation/stack';

  // Asignamos el stack
  const Stack = createStackNavigator();

  // Importando vistas
  import Login from './views/login';
  import CrearCuenta from './views/crearCuenta';

const App = () => {


  return (
    <>
       <NavigationContainer>
         <Stack.Navigator  initialRouteName="Login">
           <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: "Iniciar Sessión",
                    headerShown: false  // Ocultado el titulo de arriba
                }}
           />

         </Stack.Navigator>
       </NavigationContainer>
    </>
  );
};



export default App;
