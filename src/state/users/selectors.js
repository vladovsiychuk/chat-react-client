import {createSelector} from "reselect";

const getUserIds = (state, props) => props.userIds;

const getUserType = (state, props) => props.type;

const getUsersStore = (state) => state.users.users;

export const getUsers = createSelector(
    [getUsersStore, getUserIds],
    (userStore, userIds) => {
        return userStore
            .filter(user => userIds.includes(user.id))
    }
);

export const getUsersByType = createSelector(
    [getUsersStore, getUserType],
    (userStore, userType) => {
        return userStore.filter(user => user.type === userType)
    }
)
