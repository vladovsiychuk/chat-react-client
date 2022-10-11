import { authorized } from '../httpClient';
import EndpointConstants from '../../constants/EndpointConstants';
import types from './types';

function updateAsync(isLoading, error = null) {
    return {
        type: types.CHATS_ASYNC,
        data: {
            isLoading,
            error,
        },
    };
}

function chatsLoaded(chats) {
    return {
        type: types.CHATS_GET,
        data: chats,
    };
}

export function addNewMessage(message, companion) {
    return {
        type: types.CHATS_ADD_MESSAGE,
        data: {
            message,
            companion,
        }
    }
}

export function loadChats() {
    return async dispatch => {
        const endpoint = EndpointConstants.CHATS_GET;

        dispatch(updateAsync(true));
        try {
            const res = await authorized({
                method: endpoint.method,
                path: endpoint.path,
            });

            dispatch(chatsLoaded(res || []));
            dispatch(updateAsync(false));
        } catch (err) {
            dispatch(updateAsync(false, err));
        }
    };
}
