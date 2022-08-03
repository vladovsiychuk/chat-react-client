import { unauthorized } from '../httpClient';
import EndpointConstants from '../../constants/EndpointConstants';
import types from './types';

function updateAsync(isLoading, error = null) {
    return {
        type: types.MESSAGE_ASYNC,
        data: {
            isLoading,
            error,
        },
    };
}

function messageLoaded(messages) {
    return {
        type: types.MESSAGE_GET,
        data: {
            messages,
        },
    };
}

export function loadMessage() {
    return async dispatch => {
        const endpoint = EndpointConstants.MESSAGE_GET;

        dispatch(updateAsync(true));
        try {
            const res = await unauthorized({
                method: endpoint.method,
                path: endpoint.path,
            });

            dispatch(messageLoaded(res || []));
            dispatch(updateAsync(false));
        } catch (err) {
            console.log(err)
            dispatch(updateAsync(false, err));
        }
    };
}
