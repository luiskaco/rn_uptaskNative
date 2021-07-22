// Importamos apollo cliente
import {ApolloClient} from '@apollo/client';

// nota: Estamos conectando al apollo server

// Importamos la dependencia de cache
import {InMemoryCache} from 'apollo-cache-inmemory';

// Importamos la dependencia de conexion
import {createHttpLink} from 'apollo-link-http';
// import {HttpLink} from 'apollo-link-http';

// Importando apolo context
import {setContext} from 'apollo-link-context'  // Lo usamos para poder pasar el contenido por cabecera

// Importando platform
import {Platform} from 'react-native';

// Importamos ASync Storage
import AsyncStorage from '@react-native-async-storage/async-storage'


const httpLink = createHttpLink({
    uri: Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://192.168.1.173:4000/'  
})

// NOs permite obtener los valores y pasar los header
const authLink = setContext(async (_, headers) =>{
    //leer el token
    const token = await AsyncStorage.getItem('token')

    console.log(token);

    return {
      headers:{
        ...headers, // hhacemos una copia de los valores que tenga el header
        authorization: token ? `Bearer ${token}`: '' // Puede que exista el token o no
      }
    }
} )


// objeto cliente apollo
const client = new ApolloClient({
     cache: new InMemoryCache(), // Manejo de cache
     link: authLink.concat(httpLink) // Uniendo arreglo
});

// PRIMERA CONFIGURACION
// const uri = Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://192.168.1.173:4000/' ; 
// // objeto cliente apollo
// const client = new ApolloClient({
//      cache: new InMemoryCache(), // Manejo de cache
//      link: new HttpLink({
//         uri: uri // URL
//      })
// });


export default client;