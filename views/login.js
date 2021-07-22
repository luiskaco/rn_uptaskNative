import React,{useState} from 'react';
import {View} from 'react-native';
import {Container, Button, Text, H1, Input, FormControl,Form ,Item, Toast} from 'native-base';

// Importando estilos
import globalStyles from '../styles/global'

// Importando navegacion
import {useNavigation} from '@react-navigation/native'

// Importamos ASync Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Utilidades de apollo
import { gql, useMutation} from '@apollo/client'

// COnsulta de GRAP
const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuarioAlias($valores: AutenticarInput){
    autenticarUsuario(input: $valores) {
      token
    }
  }`;

// nota: se recomienda que el nombre sea en mayuscula

// useQuery  para consultar los query en grapy
// useMutation para consultar los mutation



const Login = () => {
    // State del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // mostrando mensaje
    const [mensaje, setMensaje] = useState(null);

    // Usando el mutation de apollo
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    // React Navigation
    const navigation = useNavigation();

    const handleSubmit = async () => {
        setMensaje(null); // Corrigiendo error event clic

        navigation.navigate('Proyectos');
        return;

        // Validar
        if(email==='' || password==='') {
            // Amostrar error
            setMensaje('Todos los campos son obligatorios');
            return ; // Evitamos continuacion
        }

        // Validamos correo
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if (!reg.test(email) ){
            setMensaje('Debe introducir un correo con la forma correcta');
        }

        // Password al menos 6 caracteres
        if(password.length < 6){
            setMensaje('El password debe ser de al menos 6 caracteres');
        }
        // Guardar el usuario

        try {
            
            const {data} = await autenticarUsuario({
                variables:{
                    // Objeto
                    valores:{
                        email,
                        password
                      }
                }
            })

            //console.log(data)

            // Extraemos el token
            const {token} = data.autenticarUsuario;
 
            // colocar token en el storoage
            await AsyncStorage.setItem('token', token);

            // Redreccionar a proyecto
            navigation.navigate('Proyectos');

        } catch (error) {
            console.log(error);

              // Guardamos mensaje
           setMensaje(error.message);
        }
    }

      // Mostrar mensaje Toiast
      const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'ok',
            duration: 5000
        })
    }

    return ( 
       <Container style={[globalStyles.contenedor ,{backgroundColor: '#e84347'}]}>
           <View style={globalStyles.contenido}>
               <H1 style={globalStyles.titulo}>Uptask</H1>
    
                <Form >
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input 
                            autoCompleteType="email"
                            placeholder="Email"
                            onChangeText={texto => setEmail(texto)}
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input 
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={texto => setPassword(texto)}
                        />
                    </Item>
                    {/* Boton de logueo */}
                    <Button square block style={globalStyles.boton}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={globalStyles.botonTexto}>Iniciar Sessión</Text>
                    </Button>

                    <Text 
                        style={globalStyles.enlace} 
                        // Enviando a crear usuario
                        onPress={() => navigation.navigate('CrearCuenta')} 

                    >Crear Cuenta</Text>

                        {/* Mostrar mensaje */}
                        {mensaje && mostrarAlerta()}
                </Form>

           </View>
       </Container>
     );
}
 
export default Login;