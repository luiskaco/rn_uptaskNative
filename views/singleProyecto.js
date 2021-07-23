import React, {useState} from 'react';
import {StyleSheet} from 'react-native'
import {Container, Button, H2, Content, List, Form, Item, Input, Toast, Text} from 'native-base';

// Components 
import Tarea from '../components/Tarea'

// Importando estilos
import globalStyles from '../styles/global'

// Utilidades de apollo
import { gql, useMutation, useQuery} from '@apollo/client'

// Crear nueva Tarea
const NUEVO_TAREA = gql`
        mutation nuevaTareaAlias($valores: TareaInput){
            nuevaTarea(input: $valores) {
                nombre
                id
                proyecto
                estado
            }
        }`;


// Consulta las tareas del proyecto
const OBTENER_TAREA = gql`
        query obtenerTareasAlias($valores: ProyectoIDInput){
            obtenerTareas(input: $valores){
                nombre
                id
                estado
            }
        }`;


const SingleProyecto = ({route}) => {
    // Para revisar los valores que se pasan entre ventana
 //   console.log(route.params)
    // Obtine el ID del proyecto
    const {id} = route.params;

    // State del componente
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState(null);

    // Apollo obtener tareas
    const {data, loading, error} = useQuery(OBTENER_TAREA,{
        variables:{
            valores:{
                proyecto: id
            }
        }
    });
    console.log(data);


    // APollo crear tareas
    const [nuevaTarea] = useMutation(NUEVO_TAREA);

    // Validar y Crear Tarea
    const handleSubmit = async () => {
        setMensaje(null); // Corrigiendo error event clic

        if(nombre === ''){
            setMensaje('El nombre de la tarea es obligatorio');
            return ;
        }   

        try {
            const {data} =  await nuevaTarea({
                variables:{
                    valores:{
                        nombre,
                        proyecto: id
                    }
                }
            });

            // console.log(data);

            // Limpiar nombre
            setNombre('');

            // Mensaje de confirmacion
            setMensaje("Tarea Creado Correctamente!");
    
            // Redireccionar


            // Reseteo por tiempo
            setTimeout(() => {
                setMensaje(null);
            }, 3000)


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

    // Si apollo esta consultando
    if(loading) return <Text> Cargando... </Text>
    
    return ( 
        <Container style={[globalStyles.contenido], {backgroundColor: '#e84347'}}>
            <Form style={{marginHorizontal: '2.5%', marginTop: 20}}>
                <Item inlineLabel last style={globalStyles.input}>
                    <Input 
                        placeholder="Nombre de la tarea"
                        onChangeText={texto => setNombre(texto)}
                    />
                </Item>
                <Button
                    style={globalStyles.boton}
                    square
                    block
                    onPress={() => handleSubmit()}
                >
                    <Text>Crear Tarea</Text>
                </Button>

               

                {/* Mostrar mensaje */}
                {mensaje && mostrarAlerta()}
            </Form>

                 <H2 style={globalStyles.subtitulo }>Tareas: {route.params.nombre} </H2>
                 <Content>
                    <List style={styles.contenido}>
                        {data.obtenerTareas.map(tarea => (
                            <Tarea
                                key={tarea.id}
                                tarea={tarea}
                               
                            />
                        )) }
                    </List>
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
 
export default SingleProyecto;