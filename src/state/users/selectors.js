import {createSelector} from "reselect";

const getUserIds = (state, props) => props.userIds;

const getUsersStore = (state) => state.users.users;

export const getUsers = createSelector(
    [getUsersStore, getUserIds],
    (userStore, userIds) => {
        return userStore
            .filter(user => userIds.includes(user.id))
    }
);
