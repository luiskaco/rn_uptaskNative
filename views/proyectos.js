import React from 'react';
import {StyleSheet} from 'react-native'
import {Container, Button, Text, H2, Content, List, ListItem, Left, Right} from 'native-base'

// Importando estilos
import globalStyles from '../styles/global'

// Importando navegacion
import {useNavigation} from '@react-navigation/native'


const Proyectos = () => {


    // React Navigation
    const navigation = useNavigation();


    return ( 
        <Container style={[globalStyles.contenedor], {backgroundColor:'#e84347'}}>
            <Button
                style={[globalStyles.boton, {marginTop:30}]}
                square
                block
                onPress={() => navigation.navigate('NuevoProyecto') }
            >
                <Text>
                    Nuevo Proyecto
                </Text>
            </Button>

            <H2 style={globalStyles.subtitulo}>
                Seleciona un proyecto
            </H2>
        </Container>
     );
}
 
export default Proyectos;