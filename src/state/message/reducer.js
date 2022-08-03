import types from './types';

export const initialState = {
    messages: [],
    messagesAsync: {
        isLoading: null,
        error: null,
        hasLoaded: false,
    },
}

function sortByDate(message1, message2) {
    return message1.date - message2.date
}

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case types.MESSAGE_ASYNC: {
            return {
                ...state,
                messagesAsync: {
                    ...state.messagesAsync,
                    ...action.data,
                },
            };
        }
        case types.MESSAGE_GET: {
            return {
                ...state,
                messagesAsync: {
                    ...state.messagesAsync,
                    hasLoaded: true,
                },
                messages: action.data.messages.sort(sortByDate),
            };
        }
        default:
            return state;
    }
}
