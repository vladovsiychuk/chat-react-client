import {createSelector} from "reselect";

const getMessagesStore = (state) => state.messages.messages;

const getRoomId = (state, props) => props.roomId;

export const roomMessagesSelector = createSelector(
    [getMessagesStore, getRoomId],
    (messagesStore, roomId) => {
        return messagesStore
            .filter(message => message.roomId === roomId)
            .sort((a, b) => a.dateCreated - b.dateCreated);
    }
);
