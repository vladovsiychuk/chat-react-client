import types from './types';

export const initialState = {
    rooms: [],
    async: {
        isLoading: null,
        error: null,
    },
};

export default function roomsReducer(state = initialState, action) {
    switch (action.type) {
        case types.ROOMS_ASYNC: {
            return {
                ...state,
                async: {
                    ...state.async,
                    ...action.data,
                },
            };
        }
        case types.ROOMS_GET: {
            return {
                ...state,
                async: {
                    ...state.async,
                },
                rooms: action.data,
            };
        }
        case types.ROOMS_ADD : {
            const clonedState = JSON.parse(JSON.stringify(state));
            const room = action.data;

            clonedState.rooms.push(room)

            return clonedState;
        }
        default:
            return state;
    }
}
