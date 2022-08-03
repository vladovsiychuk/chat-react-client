import { combineReducers } from 'redux';
import messageReducer from './message/reducer';

const appReducer = combineReducers({
    message: messageReducer,
});

const rootReducer = (state, action) => {
    // reset whole app state when AUTH_LOGOUT
    // if (action.type === authTypes.AUTH_LOGOUT) {
    //     return appReducer(undefined, action);
    // }
    return appReducer(state, action);
};

export default rootReducer;
