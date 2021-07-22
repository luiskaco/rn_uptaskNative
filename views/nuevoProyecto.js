import React,{useState} from 'react';
import {View} from 'react-native'
import {Container, Button, Text, H1, Form, Item, Input, Toast} from 'native-base';

// Importando estilos
import globalStyles from '../styles/global'

// Importando navegacion
import {useNavigation} from '@react-navigation/native'

const NuevoProyecto = () => {
    // State del componente
    const [mensaje, setMensaje] = useState(null);
    const [nombre, setNombre] = useState('');

    
    // React Navigation
    const navigation = useNavigation();
    
    // Validar Crear proyecto
    const handleSubmit = () => {
        setMensaje(null); // Corrigiendo error event clic

        // Validar
        if(nombre === ''){
            setMensaje('El nombre del proyecto es obligatorio');
            return;
        }

        // Guardar proyecto

        // Redireccionar
        navigation.navigate('Proyectos')
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
        <Container style={[globalStyles.contenedor], {backgroundColor:'#e84347'}}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.subtitulo}>
                   Nuevo Proyecto
                </H1>

                <Form>
                    <Item 
                        inlineLabel
                        last
                        style={globalStyles.input}>
                        <Input
                            placeholder="Nombre del proyecto"
                            onChangeText={texto => setNombre(texto)}
                        >
                        
                        </Input>
                    </Item>

                    <Button
                        style={[globalStyles.boton, {marginTop:30}]}
                        square
                        block
                        onPress={() => handleSubmit() }
                    >
                        <Text>
                            Crear Proyecto
                        </Text>
                    </Button>

                    {/* Mostrar mensaje */}
                    {mensaje && mostrarAlerta()}
                    
                </Form>
            </View>

       
        </Container>
     );
}
 
export default NuevoProyecto;