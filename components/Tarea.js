import React from 'react';
import { StyleSheet, Alert } from 'react-native'
import { Text, ListItem, Left, Right, Icon, Toast } from 'native-base'

// Utilidades de apollo
import { gql, useMutation, useQuery} from '@apollo/client'

// Crear nueva Tarea
const ACTUALIZAR_TAREA = gql`
        mutation actualizarTareaAlias($id: ID!, $input: TareaInput, $estado: Boolean) {
            actualizarTarea(id: $id, input:  $input, estado: $estado) {
                nombre
                id
                proyecto
                estado
            }
        }`;

  //Permite Eliminar la tarea 
  const ELIMINAR_TAREA = gql`
    mutation  eliminarTareaAlias($id: ID!) {
        eliminarTarea(id: $id)
    }
    `;

// COnsulta de GRAP
// Consulta las tareas del proyecto
const OBTENER_TAREA = gql`
        query obtenerTareasAlias($valores: ProyectoIDInput){
            obtenerTareas(input: $valores){
                nombre
                id
                estado
            }
        }`;

// nota: se recomienda que el nombre sea en mayuscula
// useQuery  para consultar los query en grapy | object destructing
// useMutation para consultar los mutation |  para extrar es array destructuri


  

const Tarea = ({tarea, proyectoID}) => {

    // Apollo 
    const [ actualizarTarea ] = useMutation(ACTUALIZAR_TAREA);
    const [ eliminarTarea ] = useMutation(ELIMINAR_TAREA, {
        // Actualizar cache
        update(cache){
            // Obtenemos las tareas
            const {obtenerTareas} = cache.readQuery({
                query:OBTENER_TAREA,
                variables:{
                    valores:{
                        proyecto: proyectoID
                    }
                }
            });

            // Reescribir la cache
            cache.writeQuery({
                query:OBTENER_TAREA,
                variables:{
                    valores:{
                        proyecto: proyectoID
                    }
                },
                data:{
                    // condicional de filter: Si es diferente, mantener en cache
                    obtenerTareas: obtenerTareas.filter(tareaActual => tareaActual.id!== tarea.id)
                }
            })
        }

    });


    // Cambia el estado de una tarea a completo o incompleto
    const cambiarEstado = async () => {
        // Obtener ID de la tarea
        const {id} = tarea;

        console.log(!tarea.estado)


        try {
            const {data} = await actualizarTarea({
                variables:{
                    id,
                    input:{
                        nombre: tarea.nombre
                    },
                    estado:!tarea.estado // Contrario a lo que tenga actualemnte
                }
            }); 

            console.log(data)

            /**
             * Nota: La actualizacion si refresca el cache, a diferencia de cuando se registrar y eliminar . 
             */

        } catch (error) {
            console.log(error)
        }
    }

     // Dialogo para eliminar o no una tarea
     const mostrarEliminar = () => {
        Alert.alert('Eliminar Tarea', '¿Deseas eliminar esta tarea?', [
            {
                text: 'Cancelar', 
                style: 'cancel'
            }, 
            {
                text: 'Confirmar',
                onPress: () => eliminarTareaDB()
            }
        ])
    }

    // ELiminar Tarea de la BD

    const eliminarTareaDB= async () => {
        const {id} = tarea;

        try {
            const {data} = await eliminarTarea({
                variables:{
                    id
                }
            });

            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
      
            <ListItem
                onPress={() => cambiarEstado()}
                onLongPress={() => mostrarEliminar()} // evento de  apretado largo
            >
                <Left>
                    <Text>
                        {tarea.nombre}
                    </Text>
                </Left>
               <Right>
                  { tarea.estado ? (
                        <Icon
                            style={[styles.icono, styles.completo]}
                            name="ios-checkmark-circle"
                        />
                   ) : (
                        <Icon
                            style={[styles.icono, styles.incompleto]}
                            name="ios-checkmark-circle"
                        />
                   )}


               </Right>
            </ListItem>
     );
}

const styles = StyleSheet.create({
    icono: {
        fontSize: 32
    },
    completo: {
        color: 'green'
    },
    incompleto: {
        color: '#E1E1E1'
    }
})
 
export default Tarea;