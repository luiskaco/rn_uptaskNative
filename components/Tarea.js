import React from 'react';
import { StyleSheet, Alert } from 'react-native'
import { Text, ListItem, Left, Right, Icon, Toast } from 'native-base'

const Tarea = ({tarea}) => {
    return ( 
      
            <ListItem>
                <Left>
                    <Text>
                        {tarea.nombre}
                    </Text>
                </Left>
               <Right>
                   {tarea.estado ? (
                         <Icon styles={[styles.icono, styles.completo]}
                            name="ios-checkmark-circle"
                        />
                   ) : (
                         <Icon styles={[styles.icono, styles.incompleto]}
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