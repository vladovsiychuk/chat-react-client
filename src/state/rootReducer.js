import { combineReducers } from 'redux';
import chatsReducer from './chats/reducer';
import userReducer from './users/reducer';

const appReducer = combineReducers({
    chats: chatsReducer,
    users: userReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
