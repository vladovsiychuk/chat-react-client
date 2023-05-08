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
        case types.CHATS_ADD_MESSAGE : {
            const clonedState = JSON.parse(JSON.stringify(state));
            const message = action.data.message;
            const companion = action.data.companion;
            const index = clonedState.rooms.findIndex(x => x.companion === companion);

            index === -1 ?
                clonedState.rooms.push({companion: companion, messages: [message]})
                :
                clonedState.rooms.find(chat => chat.companion === companion)
                    .messages
                    .push(message);

            return clonedState;
        }
        case types.CHATS_ADD_CHAT : {
            const clonedState = JSON.parse(JSON.stringify(state));
            const newChat = {companion: action.data.companion, messages: []};
            clonedState.rooms.push(newChat)

            return clonedState;
        }
        default:
            return state;
    }
}
