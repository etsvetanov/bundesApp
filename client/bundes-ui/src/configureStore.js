import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';


const configureStore = () => {
    const enhancers = compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const persistedState = {};

    return createStore(
        rootReducer,
        persistedState,
        enhancers
    );
};

export default configureStore;
