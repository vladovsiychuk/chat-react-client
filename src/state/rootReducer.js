import { combineReducers } from 'redux';
import roomsReducer from './rooms/reducer';
import userReducer from './users/reducer';

const appReducer = combineReducers({
    rooms: roomsReducer,
    users: userReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
