import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
    contenedor:{
        flex:1
    },
    contenido:{
        flexDirection:'column',
        justifyContent:'center',
        marginHorizontal:'2.5%',
        flex:1,
     
    },
    titulo:{
        textAlign:'center',
        marginBottom:20,
        fontSize:32,
        fontWeight:'bold',
        color:'#fff',

    },
    input:{ 
        backgroundColor:'#fff',
        marginBottom: 20,
    },
    boton:{
        backgroundColor:"#28303B",
   
    },
    botonTexto:{
        textTransform: 'uppercase',
        fontWeight:'bold',
        color:"#fff"

    },
    enlace:{
        color:'#fff',
        marginTop:60,
        textAlign:'center',
        fontSize:18,
        textTransform:'uppercase'
    }

});

export default globalStyles;