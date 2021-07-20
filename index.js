/**
 * @format
 */
import React from 'react';  // importamos react

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Importando apollo
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';

// Nota: Hacemos que este disponible el apollo en toda la aplicacion
const uptaskApp = () => (
    // Todo va ser disponible dentro del proyecto
    <ApolloProvider client={client}>
         
         <App />
    </ApolloProvider>
)

 /* Agregamos el componente app */


// AppRegistry.registerComponent(appName, () => App);

// Pasamoes la aplicacion actual mas el provider
AppRegistry.registerComponent(appName, () => uptaskApp);
