import types from './types';

export const initialState = {
    rooms: [],
    selectedRoomId: '',
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
        case types.ROOMS_LIST: {
            return {
                ...state,
                async: {
                    ...state.async,
                },
                rooms: action.data,
            };
        }
        case types.ROOMS_UPDATE : {
            // Check if the room already exists in the state
            const existingRoomIndex = state.rooms.findIndex(
                (room) => room.id === action.data.id
            );

            if (existingRoomIndex !== -1) {
                // Room with the same ID already exists, replace it
                return {
                    ...state,
                    rooms: [
                        ...state.rooms.slice(0, existingRoomIndex),
                        action.data,
                        ...state.rooms.slice(existingRoomIndex + 1),
                    ],
                };
            } else {
                // Room doesn't exist, add it to the list
                return {
                    ...state,
                    rooms: [...state.rooms, action.data],
                };
            }
        }
        case types.SET_SELECTED_ROOM: {
            return {
                ...state,
                async: {
                    ...state.async,
                },
                selectedRoomId: action.data,
            };
        }
        default:
            return state;
    }
}
