import {createSelector} from "reselect";

const getUserType = (state, props) => props.type;

const getUsersStore = (state) => state.users.users;

export const getUsersByType = createSelector(
    [getUsersStore, getUserType],
    (userStore, userType) => {
        return userStore.filter(user => user.type === userType)
    }
)
