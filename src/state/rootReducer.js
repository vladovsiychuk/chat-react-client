import {combineReducers} from 'redux';
import roomsReducer from './rooms/reducer';
import userReducer from './users/reducer';
import messagesReducer from "./messages/reducer";

const appReducer = combineReducers({
    rooms: roomsReducer,
    messages: messagesReducer,
    users: userReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
