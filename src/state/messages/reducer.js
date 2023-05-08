export const initialState = {
    messages: [],
    async: {
        isLoading: null,
        error: null,
    },
};

export default function messagesReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
