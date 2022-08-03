import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
// import sseMiddleware from './middleware/sseMiddleware';
// import authMiddleware from './middleware/authMiddleware';
// import applicationMiddleware from './middleware/applicationMiddleware';
// import trackingMiddleware from './middleware/trackingMiddleware';
// import {
//     listenToMediaQueries,
//     listenToNavigationChange,
//     listenToResize,
//     listenToAccessTokenChange,
// } from './application/actions';
//
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        : compose;

const enhancer = composeEnhancers(
    // applyMiddleware(thunk, sseMiddleware, applicationMiddleware, trackingMiddleware, authMiddleware)
    applyMiddleware(thunk)
);

// const store = createStore(rootReducer, enhancer);
const store = createStore(rootReducer, enhancer);
// store.dispatch(listenToMediaQueries());
// store.dispatch(listenToResize());
// store.dispatch(listenToNavigationChange());
// store.dispatch(listenToAccessTokenChange());

export default store;
