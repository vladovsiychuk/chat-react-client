import {createSelector} from "reselect";

const getRoomId = (state, props) => props.roomId;

const getRoomsStore = (state) => state.rooms.rooms;

const getSelectedRoomId = (state) => state.rooms.selectedRoomId

export const roomSelector = createSelector(
    [getRoomsStore, getRoomId],
    (roomStore, roomId) => {
        return roomStore
            .filter(room => room.id === roomId)
    }
);

export const getSelectedRoomSelector = createSelector(
    [getRoomsStore, getSelectedRoomId,],
    (roomsStore, selectedRoomId) => roomsStore.find(room => room.id === selectedRoomId)
)
