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

export function actionEditing(messageId) {
    return {
        type: types.MESSAGE_ACTION_EDITING,
        data: messageId,
    }
}

export function actionTranslating(messageId, defaultLanguage) {
    return {
        type: types.MESSAGE_ACTION_TRANSLATING,
        data: {
            messageId,
            language: defaultLanguage
        }
    }
}

export function addTranslationLanguage(language) {
    return {
        type: types.MESSAGE_ACTION_TRANSLATING_ADD_LANGUAGE,
        data: language,
    }
}

export function actionReplying(messageId) {
    return {
        type: types.MESSAGE_ACTION_REPLYING,
        data: messageId,
    }
}

export function actionCancel() {
    return {
        type: types.MESSAGE_ACTION_CANCEL,
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

export function updateMessageContent(messageId, content) {
    return async dispatch => {
        if (content === '')
            return

        const {method, path} = EndpointConstants.MESSAGES_PUT;

        dispatch(updateAsync(true));
        try {
            await authorized({
                method,
                path: path(messageId),
                body: {
                    content: content,
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

export function translateMessage(translationContent) {
    return async (dispatch, getState) => {
        const {messageAction} = getState().messages
        const {method, path} = EndpointConstants.MESSAGES_TRANSLATE;

        dispatch(updateAsync(true));
        try {
            await authorized({
                method,
                path: path(messageAction.data.messageId),
                body: {
                    language: messageAction.data.language,
                    translation: translationContent,
                }
            });

            dispatch(updateAsync(false));
        } catch (err) {
            dispatch(updateAsync(false, err));
        }
    }
}
