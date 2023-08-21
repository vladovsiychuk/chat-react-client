import {createSelector} from "reselect";

const getMessagesStore = (state) => state.messages.messages;

const getCurrentUserStore = (state) => state.users.currentUser.data;

const getSelectedRoomId = (state) => state.rooms.selectedRoomId

const getActionMessageId = (state) => state.messages.messageAction?.data.messageId

const getRoomId = (state, props) => props.roomId;

export const roomMessagesSelector = createSelector(
    [getMessagesStore, getRoomId],
    (messagesStore, roomId) => {
        return messagesStore
            .filter(message => message.roomId === roomId)
            .sort((a, b) => a.dateCreated - b.dateCreated);
    }
);

export const lastRoomMessageSelector = createSelector(
    roomMessagesSelector,
    (roomMessages) => roomMessages[roomMessages.length - 1]
);

export const roomUnreadMessagesSelector = createSelector(
    [roomMessagesSelector, getCurrentUserStore],
    (roomMessages, currentUser) => roomMessages.filter(
        (message) => message.senderId !== currentUser.id && !message.read.includes(currentUser.id)
    )
);

export const getSelectedRoomMessages = createSelector(
    [getMessagesStore, getSelectedRoomId],
    (messagesStore, selectedRoomId) => {
        return messagesStore
            .filter(message => message.roomId === selectedRoomId)
            .sort((a, b) => a.dateCreated - b.dateCreated);
    }
);

export const getActionMessage = createSelector(
    [getMessagesStore, getActionMessageId],
    (messagesStore, actionMessageId) => {
        return messagesStore.find(message => message.id === actionMessageId);
    }
);

