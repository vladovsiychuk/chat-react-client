import types from './types';

export const initialState = {
    currentUser: {
        data: null,
        socketData: {
            connected: false,
            joined: false,
        },
    },
    users: [],
    async: {
        currentUserIsFound: null,
        isLoading: null,
        error: null,
    },
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.CURRENT_USER_ASYNC: {
            return {
                ...state,
                async: {
                    ...state.async,
                    ...action.data,
                },
            };
        }
        case types.CURRENT_USER_JOINED:
        case types.CURRENT_USER_CONNECTED: {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    socketData: {
                        ...state.currentUser.socketData,
                        ...action.data
                    },
                },
            }
        }
        case types.USER_GET: {
            return {
                ...state,
                users: action.data
            }
        }
        case types.CURRENT_USER_GET: {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    data: action.data
                }
            }
        }
        default:
            return state;
    }
}
