// Primera linea navegacion
import 'react-native-gesture-handler';
import React from 'react';

// Importamos NativeBase para importar el objeto de root
import {Root} from 'native-base';

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
{/* Objeto necesario */}

  return (

    <>
    <Root> 

       <NavigationContainer>
         <Stack.Navigator  initialRouteName="Login">
           {/* Creando las ventanas */}
           <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: "Iniciar Sessión",
                    headerShown: false  // Ocultado el titulo de arriba
                }}
           />
            <Stack.Screen
                name="CrearCuenta"
                component={CrearCuenta}
                options={{
                    title: "Crear Cuenta",// Ocultado el titulo de arriba
                   // Personalizandoe l header
                    headerStyle:{
                      // Cambiando el color del background
                      backgroundColor: '#28303b',
                    },
                    // Cambiando el color del titulo
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight:'bold',
                    }

                }}
           />

         </Stack.Navigator>
       </NavigationContainer>
            
    </Root>
    </>
  );
};



export default App;
