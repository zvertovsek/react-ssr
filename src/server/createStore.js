import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

import reducers from '../app/reducers';




export default (req) => {
    const axiosInstance = axios.create({
        baseURL: 'https://react-ssr-api.herokuapp.com',
        headers: { cookie: req.get('cookie') | '' }
    });

    const store = createStore(
        reducers, 
        {}, 
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    );

    return store;
};

