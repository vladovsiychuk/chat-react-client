import {authorized} from '../httpClient';
import EndpointConstants from '../../constants/EndpointConstants';
import types from './types';

function updateAsync(isLoading, error = null, currentUserIsFound = null) {
    return {
        type: types.CURRENT_USER_ASYNC,
        data: {
            currentUserIsFound,
            isLoading,
            error,
        },
    };
}

function addUser(user) {
    return {
        type: types.USER_GET,
        data: user,
    };
}

function usersLoaded(users) {
    return {
        type: types.USER_LIST,
        data: users,
    };
}

function currentUserLoaded(currentUser) {
    return {
        type: types.CURRENT_USER_GET,
        data: currentUser,
    };
}

export function currentUserConnected(connected) {
    return {
        type: types.CURRENT_USER_CONNECTED,
        data: {
            connected,
        }
    };
}

export function currentUserJoined(joined) {
    return {
        type: types.CURRENT_USER_JOINED,
        data: {
            joined
        }
    };
}

export function createCurrentUser() {
    return async dispatch => {
        const endpoint = EndpointConstants.CURRENT_USER_POST;

        dispatch(updateAsync(true));
        try {
            const userCreateProperties = JSON.parse(localStorage.getItem("newUserProps"))

            const res = await authorized({
                method: endpoint.method,
                path: endpoint.path,
                body: userCreateProperties,
            });

            dispatch(currentUserLoaded(res || []));
            dispatch(updateAsync(false, null, true));
        } catch (err) {
            dispatch(updateAsync(false, err, null));
        }
    };
}

export function getUser(userId) {
    return async dispatch => {
        const {method, path} = EndpointConstants.USER_GET;

        dispatch(updateAsync(true, null, true));
        try {
            const res = await authorized({
                method: method,
                path: path(userId),
            });

            if (res)
                dispatch(addUser(res));
            dispatch(updateAsync(false, null, true));
        } catch (err) {
            dispatch(updateAsync(false, err, null));
        }
    };
}

export function loadRoomsMembers() {
    return async dispatch => {
        const {method, path} = EndpointConstants.USER_ROOMS_MEMBERS;

        dispatch(updateAsync(true, null, true));
        try {
            const res = await authorized({
                method: method,
                path: path,
            });

            dispatch(usersLoaded(res || []));
            dispatch(updateAsync(false, null, true));
        } catch (err) {
            dispatch(updateAsync(false, err, null));
        }
    };
}

export function loadCurrentUser() {
    return async dispatch => {
        const endpoint = EndpointConstants.CURRENT_USER_GET;

        dispatch(updateAsync(true));
        try {
            const res = await authorized({
                method: endpoint.method,
                path: endpoint.path,
            });

            dispatch(currentUserLoaded(res || []));
            dispatch(updateAsync(false, null, true));
        } catch (err) {
            console.log('err', err);

            if (err.status === 404) {
                dispatch(updateAsync(false, err, false));
            } else {
                dispatch(updateAsync(false, err, null));
            }
        }
    };
}
