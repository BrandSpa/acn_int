import { createStore, applyMiddleware } from 'redux';
import thunk from 'react-thunk';

const middlewares = applyMiddleware(thunk);
const store = createStore(reducers, middlewares);

export default store;