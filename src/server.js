import 'babel-polyfill';
import express from 'express';
import renderer from './server/renderer';
import createStore from './server/createStore';

import { matchRoutes } from 'react-router-config';
import Routes from './app/routes';


const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore();

    const promises = matchRoutes(Routes, req.path).map(( { route } ) => {
        return route.loadData ? route.loadData(store) : null;
    });

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });
    

    
});

app.listen(3000, () => {
    console.log('Listnening on port 3000');
});