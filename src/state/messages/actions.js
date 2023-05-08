import EndpointConstants from "../../constants/EndpointConstants";
import {authorized} from "../httpClient";
import types from "./types";

function updateAsync(isLoading, error = null) {
    return {
        type: types.MESSAGES_ASYNC,
        data: {
            isLoading,
            error,
        },
    };
}

function messagesLoaded(messages) {
    return {
        type: types.MESSAGES_GET,
        data: messages,
    };
}

export function loadMessages() {
    return async dispatch => {
        const {method, path} = EndpointConstants.MESSAGES_GET;

        dispatch(updateAsync(true));
        try {
            const res = await authorized({
                method: method,
                path: path(30),
            });

            dispatch(messagesLoaded(res || []));
            dispatch(updateAsync(false));
        } catch (err) {
            dispatch(updateAsync(false, err));
        }
    };
}
