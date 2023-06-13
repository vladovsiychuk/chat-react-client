import {createSelector} from "reselect";

const getRoomId = (state, props) => props.roomId;

const getRoomsStore = (state) => state.rooms.rooms;

export const roomSelector = createSelector(
    [getRoomsStore, getRoomId],
    (roomStore, roomId) => {
        return roomStore
            .filter(room => room.id === roomId)
    }
);
