import React from 'react';
import {StyleSheet} from 'react-native'
import {Container, Button, Text, H2, Content, List, ListItem, Left, Right} from 'native-base'

// Importando estilos
import globalStyles from '../styles/global'

// Importando navegacion
import {useNavigation} from '@react-navigation/native'

// Utilidades de apollo
import { gql, useQuery} from '@apollo/client'

// COnsulta de GRAP
const OBTENER_PROYECTOS = gql`
    query obtenerProyectosAlias{
        obtenerProyectos{
            id
            nombre
        } 
    }`;

// nota: se recomienda que el nombre sea en mayuscula
// useQuery  para consultar los query en grapy | object destructing
// useMutation para consultar los mutation |  para extrar es array destructuri


const Proyectos = () => {

    // React Navigation
    const navigation = useNavigation();

    // Apollo
     const {data, loading, error} = useQuery(OBTENER_PROYECTOS);

        // console.log(data);
        // console.log(loading)
        // console.log(error);
     /* data: objeto de datos
        loading: true o false mientra se espera datos
        error: muestra mensaje de error | No siempre son entendible los errores
     */

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

            <Content>
                {!loading ? (
                            <List style={styles.contenido}>
                            {data.obtenerProyectos.map(proyecto => (
                                <ListItem
                                    key={proyecto.id}
                                    onPress={() => navigation.navigate('SingleProyecto',proyecto )}
                                >
                                    <Left>
                                        <Text>{proyecto.nombre}</Text>
                                    </Left>
                                    <Right>
        
                                    </Right>
                                </ListItem>
                            ))}
                        </List>


                ) : null }
            
            </Content>
        </Container>
     );
}
 
const styles = StyleSheet.create({
    contenido:{
        backgroundColor:'#fff',
        marginHorizontal:'2.5%'
    }
})


export default Proyectos;