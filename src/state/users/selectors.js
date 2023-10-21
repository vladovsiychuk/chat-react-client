import {createSelector} from "reselect";

const getUserType = (state, props) => props.type;
const getUsersStore = (state) => state.users.users;
const getUserId = (state, props) => props.id;

export const getUsersByType = createSelector(
    [getUsersStore, getUserType],
    (userStore, userType) => {
        return userStore.filter(user => user.type === userType)
    }
)

export const getUserById = createSelector(
    [getUsersStore, getUserId],
    (userStore, userId) => {
        return userStore.find(user => user.id === userId)
    }
)
