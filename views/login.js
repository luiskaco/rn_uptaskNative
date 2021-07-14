import React from 'react';
import {View} from 'react-native';
import {Container, Button, Text, H1, Input, FormControl,Form ,Item, Toast} from 'native-base';

// Importando estilos
import globalStyles from '../styles/global'

// Importando navegacion
import {useNavigation} from '@react-navigation/native'

const Login = () => {

    // React Navigation
    const navigation = useNavigation();

    return ( 
       <Container style={[globalStyles.contenedor ,{backgroundColor: '#e84347'}]}>
           <View style={globalStyles.contenido}>
               <H1 style={globalStyles.titulo}>Uptask</H1>
    
                <Form >
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input 
                            autoCompleteType="email"
                            placeholder="Email"
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input 
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                    </Item>
                    {/* Boton de logueo */}
                    <Button squere block style={globalStyles.boton}>
                        <Text style={globalStyles.botonTexto}>Iniciar Sessión</Text>
                    </Button>

                    <Text 
                        style={globalStyles.enlace} 
                        // Enviando a crear usuario
                        onPress={() => navigation.navigate('CrearCuenta')} 

                    >Crear Cuenta</Text>
                </Form>

           </View>
       </Container>
     );
}
 
export default Login;