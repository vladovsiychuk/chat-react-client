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

export function updateMessage(message) {
    return {
        type: types.MESSAGE_UPDATE,
        data: message,
    }
}

function updateRoomMessages(messages) {
    return {
        type: types.MESSAGES_UPDATE,
        data: messages,
    }
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

export function loadRoomMessages(roomId) {
    return async dispatch => {
        const {method, path} = EndpointConstants.MESSAGES_ROOMS_GET;

        dispatch(updateAsync(true));
        try {
            const res = await authorized({
                method: method,
                path: path(roomId),
            });

            dispatch(updateRoomMessages(res || []));
            dispatch(updateAsync(false));
        } catch (err) {
            dispatch(updateAsync(false, err));
        }
    };
}

export function sendMessage(roomId, content) {
    return async dispatch => {
        if (content === '')
            return

        const {method, path} = EndpointConstants.MESSAGES_POST;

        dispatch(updateAsync(true));
        try {
            await authorized({
                method,
                path,
                body: {
                    roomId,
                    content,
                }
            });

            dispatch(updateAsync(false));
        } catch (err) {
            dispatch(updateAsync(false, err));
        }
    }
}

export function readMessage(messageId) {
    return async dispatch => {
        const {method, path} = EndpointConstants.MESSAGES_READ;

        dispatch(updateAsync(true));
        try {
            await authorized({
                method,
                path: path(messageId),
            });

            dispatch(updateAsync(false));
        } catch (err) {
            dispatch(updateAsync(false, err));
        }
    }
}
