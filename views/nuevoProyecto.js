import React,{useState} from 'react';
import {View} from 'react-native'
import {Container, Button, Text, H1, Form, Item, Input, Toast} from 'native-base';

// Importando estilos
import globalStyles from '../styles/global'

// Importando navegacion
import {useNavigation} from '@react-navigation/native'


// Utilidades de apollo
import { gql, useMutation} from '@apollo/client'

// COnsulta de GRAP
const NUEVO_PROYECTO = gql`
        mutation nuevoProyectoAlias($valores: ProyectoInput){
            nuevoProyecto(input: $valores) {
            nombre
            id
            }
        }`;

// ACTUALIZAR EL CACHE
const OBTENER_PROYECTOS = gql`
    query obtenerProyectosAlias{
        obtenerProyectos{
            id
            nombre
        } 
    }`;

const NuevoProyecto = () => {
    // State del componente
    const [mensaje, setMensaje] = useState(null);
    const [nombre, setNombre] = useState('');

    // APollo
    const [nuevoProyecto] = useMutation(NUEVO_PROYECTO,{
        // Actualizamos la ache de la data del nuevo proyecto
        update(cache, { data: {nuevoProyecto}}) {
            // Extramos proyecto de la cache consultando todos los proyectos
            const { obtenerProyectos } = cache.readQuery({ query: OBTENER_PROYECTOS });
            cache.writeQuery({
                query: OBTENER_PROYECTOS,
                data: {obtenerProyectos: obtenerProyectos.concat([nuevoProyecto]) }
            })
        }

    });

    // Nota: Ver video 262 para refrescar.
  
    // React Navigation
    const navigation = useNavigation();
    
    // Validar Crear proyecto
    const handleSubmit = async () => {
        setMensaje(null); // Corrigiendo error event clic

        // Validar
        if(nombre === ''){
            setMensaje('El nombre del proyecto es obligatorio');
            return;
        }

        // Guardar proyecto

        try {
            const {data} = await nuevoProyecto({
                variables:{
                    valores:{
                        nombre
                      }
                }
            });
            // Verificacion
         //   console.log(data)
            // Mensaje de confirmacion
            setMensaje("Proyecto Creado Correctamente!");
            // Reseteo
            setNombre('');

            // Redireccionar
           navigation.navigate('Proyectos')


        }catch (error){
           // console.log(error);

            // Guardamos mensaje
           setMensaje(error.message);
       //    setMensaje(error.message.replace('GraphQl error:', ''));

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