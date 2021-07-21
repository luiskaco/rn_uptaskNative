import React, {useState} from 'react';
import {View} from 'react-native';
import {Container, Button, Text, H1, Input, FormControl,Form ,Item, Toast} from 'native-base';

// Importando estilos
import globalStyles from '../styles/global'

// Importando navegacion
import {useNavigation} from '@react-navigation/native'

// Utilidades de apollo
import { gql, useMutation} from '@apollo/client'

// COnsulta de GRAP
const NUEVA_CUENTA = gql`
    mutation crearUsuarioAlias($valores: UsuarioInput){
    crearUsuario(input: $valores)
}`;

// nota: se recomienda que el nombre sea en mayuscula



const CrearCuenta = () => {
    // State del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // mostrando mensaje
    const [mensaje, setMensaje] = useState(null);

    // Usando el mutation de apollo
    const [crearUsuario ] = useMutation(NUEVA_CUENTA);

    /**
     * NOta: el valor inical del useMutation es la consulta del mutation
     */

    // React Navigation
    const navigation = useNavigation();

    // Cuando el usuario presiona crear cuenta
    const handleSubmit = async () => {
        setMensaje(null); // Corrigiendo error event clic

        // Validar
        if(nombre === '' || email==='' || password==='') {
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
           const {data} = await crearUsuario({
               // nota: debemos pasar el objeto variables para consulta
               variables: {
                    // Pasamos la variable valores, especificada en al consulta del mutation
                valores:{
                     "nombre":nombre, 
                     email, 
                     password
                    //  Nota: Siempre recordar: si tenemos llave y valor del mismo nombre, lo simplificamos colocando uno.
                 }
               }
           }); // Funcion del resolver en servidor en react

           // Respuesta del servidor
           console.log(data.crearUsuario);

           // Guardamos mensaje
           setMensaje(data.crearUsuario);

           // Redireccionamos al login
           navigation.navigate('login');

        } catch (error) {
            console.log(error.message)
      
           // Guardamos mensaje
           setMensaje(error.message);
        }
    }


    // Mostrar mensaje Toiast
    const mostarAlerta = () => {
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
                            autoCompleteType="name"
                            placeholder="Nombre"
                            onChangeText={(texto) => setNombre(texto)}
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input 
                            autoCompleteType="email"
                            placeholder="Email"
                            onChangeText={texto => setEmail(texto)}
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input 
                            autoCompleteType="password"
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={texto => setPassword(texto)}
                        />
                    </Item>
                    {/* Boton de logueo */}
                    <Button 
                        square 
                        block 
                        style={globalStyles.boton}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={globalStyles.botonTexto}>Crear Cuenta</Text>
                    </Button>

                    <Text 
                        style={globalStyles.enlace} 
                        // Enviando a crear usuario
                        onPress={() => navigation.navigate('Login')} 

                    >Regresar</Text>


                    {/* Mostrar mensaje */}
                    {mensaje && mostarAlerta()}
                </Form>

           </View>
       </Container>
     );
}
 
export default CrearCuenta;