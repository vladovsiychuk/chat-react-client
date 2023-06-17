import {authorized} from '../httpClient';
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
        type: types.ROOMS_LIST,
        data: rooms,
    };
}

function addNewRoom(room) {
    return {
        type: types.ROOMS_ADD,
        data: room,
    };
}

export function setSelectedRoom(selectedRoomId) {
    return {
        type: types.SET_SELECTED_ROOM,
        data: selectedRoomId,
    };
}

export function loadRooms() {
    return async dispatch => {
        const endpoint = EndpointConstants.ROOMS_LIST;

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

export function getRoom(roomId) {
    return async dispatch => {
        const endpoint = EndpointConstants.ROOMS_GET;

        dispatch(updateAsync(true));
        try {
            const res = await authorized({
                path: endpoint.path(roomId),
                method: endpoint.method,
            });

            dispatch(addNewRoom(res));
            dispatch(updateAsync(false));
        } catch (err) {
            dispatch(updateAsync(false, err));
        }
    }
}

export function createRoom(companionUserId) {
    return async dispatch => {
        const endpoint = EndpointConstants.ROOMS_POST;

        dispatch(updateAsync(true));
        try {
            const res = await authorized({
                path: endpoint.path,
                method: endpoint.method,
                body: {
                    userId: companionUserId
                }
            });

            if (res) {
                dispatch(addNewRoom(res));
                dispatch(setSelectedRoom(res.id))
            }
            dispatch(updateAsync(false));
        } catch (err) {
            dispatch(updateAsync(false, err));
        }
    };
}
