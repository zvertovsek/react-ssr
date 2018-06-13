import 'babel-polyfill';
import express from 'express';
import proxy from 'express-http-proxy';
import renderer from './server/renderer';
import createStore from './server/createStore';

import { matchRoutes } from 'react-router-config';
import Routes from './app/routes';

const _PORT = 3000;

const app = express();

app.use('/api', proxy('https://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts){
        opts.headers['x-forwarded-host'] = 'localhost:3000'
        return opts;
    }
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path).map(( { route } ) => {
        return route.loadData ? route.loadData(store) : null;
    });

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });
    
});

app.listen(_PORT, () => {
    console.log('Listnening on port 3000');
});