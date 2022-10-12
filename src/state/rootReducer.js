import { combineReducers } from 'redux';
import messageReducer from './chats/reducer';
import chatsReducer from './chats/reducer';
import userReducer from './users/reducer';

const appReducer = combineReducers({
    message: messageReducer,
    chats: chatsReducer,
    users: userReducer,
});

const rootReducer = (state, action) => {
    // reset whole app state when AUTH_LOGOUT
    // if (action.type === authTypes.AUTH_LOGOUT) {
    //     return appReducer(undefined, action);
    // }
    return appReducer(state, action);
};

export default rootReducer;
