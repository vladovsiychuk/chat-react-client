import types from './types';

export const initialState = {
    chats: [],
    async: {
        isLoading: null,
        error: null,
    },
}

export default function chatsReducer(state = initialState, action) {
    switch (action.type) {
        case types.CHATS_ASYNC: {
            return {
                ...state,
                async: {
                    ...state.async,
                    ...action.data,
                },
            };
        }
        case types.CHATS_GET: {
            return {
                ...state,
                async: {
                    ...state.async,
                },
                chats: action.data,
            };
        }
        case types.CHATS_ADD_MESSAGE : {
            const clonedState = JSON.parse(JSON.stringify(state));
            const message = action.data.message
            const companion = action.data.companion
            const index = clonedState.chats.findIndex(x => x.companion === companion);

            index === -1 ?
                clonedState.chats.push({companion: companion, messages: [message]})
                :
                clonedState.chats.find(chat => chat.companion === companion).messages.push(message)

            return clonedState
        }
        default:
            return state;
    }
}
