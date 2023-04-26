import { authorized } from '../httpClient';
import EndpointConstants from '../../constants/EndpointConstants';
import types from './types';

function updateAsync(isLoading, error = null) {
    return {
        type: types.ROOMS_ASYNC,
        data: {
            isLoading,
            error,
        },
    };
}

function roomsLoaded(rooms) {
    return {
        type: types.ROOMS_GET,
        data: rooms,
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

export function addNewChat(companion) {
    return {
        type: types.CHATS_ADD_CHAT,
        data: {
            companion,
        }
    }
}

export function loadRooms() {
    return async dispatch => {
        const endpoint = EndpointConstants.ROOMS_GET;

        dispatch(updateAsync(true));
        try {
            const res = await authorized({
                method: endpoint.method,
                path: endpoint.path,
            });

            dispatch(roomsLoaded(res || []));
            dispatch(updateAsync(false));
        } catch (err) {
            dispatch(updateAsync(false, err));
        }
    };
}
