import types from "./types";

export const initialState = {
    messages: [],
    async: {
        isLoading: null,
        error: null,
    },
};

export default function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case types.MESSAGES_ASYNC: {
            return {
                ...state,
                async: {
                    ...state.async,
                    ...action.data,
                },
            };
        }
        case types.MESSAGES_GET: {
            return {
                ...state,
                async: {
                    ...state.async,
                },
                messages: action.data,
            };
        }
        case types.MESSAGES_ADD : {
            const clonedState = JSON.parse(JSON.stringify(state));
            const message = JSON.parse(action.data);

            clonedState.messages.push(message)

            return clonedState;
        }
        default:
            return state;
    }
}
