// Importamos apollo cliente
import {ApolloClient} from '@apollo/client';

// nota: Estamos conectando al apollo server

// Importamos la dependencia de cache
import {InMemoryCache} from 'apollo-cache-inmemory';

// Importamos la dependencia de conexion
import {HttpLink} from 'apollo-link-http';


// objeto cliente apollo

const client = new ApolloClient({
     cache: new InMemoryCache(), // Manejo de cache
     link: new HttpLink({
        uni: 'http://localhost:4000/' // URL
     })

});



export default client;