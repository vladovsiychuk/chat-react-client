import React, {useEffect, useState} from "react";
import {
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemIcon,
    Typography,
    Divider,
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {
    lastRoomMessageSelector,
    roomUnreadMessagesSelector
} from "../../state/messages/selectors";
import {readMessage} from "../../state/messages/actions";
import {setSelectedRoom} from "../../state/rooms/actions";

function RoomListItem({room, setSelectedRoom, readMessage}) {

    const [avatar, setAvatar] = useState('')
    const [userName, setUserName] = useState('')

    const currentUser = useSelector(state => state.users.currentUser);
    const users = useSelector(state => state.users.users);
    const selectedRoom = useSelector(state => state.rooms.selectedRoomId)

    const lastRoomMessage = useSelector((state) =>
        lastRoomMessageSelector(state, {roomId: room.id})
    );

    const unreadMessages = useSelector((state) =>
        roomUnreadMessagesSelector(state, {roomId: room.id})
    );

    useEffect(() => {
        const members = room.members.filter(member => member !== currentUser.data.id)

        const user = users.find(user => user.id === members[0]);

        const avatar = members.length === 1 && user ? user.email.charAt(0) : null;
        const username = members.length === 1 && user ? user.email : '';

        setAvatar(avatar)
        setUserName(username)
    }, [users, currentUser, room]);

    useEffect(() => {
        if (selectedRoom === room.id && unreadMessages.length > 0) {
            unreadMessages.forEach(message => {
                    readMessage(message.id)
                }
            )
        }
        // eslint-disable-next-line
    }, [selectedRoom])

    return (
        <React.Fragment>
            <ListItemButton
                onClick={() => {
                    setSelectedRoom(room.id);
                }}
                selected={selectedRoom === room.id}
                alignItems="flex-start"
            >
                <ListItemAvatar>
                    <Avatar>{avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={truncateString(userName)}
                    secondary={
                        <React.Fragment>
                            <Typography component="span" color="textPrimary">
                                {lastRoomMessage?.content ? lastRoomMessage.content : ''}
                            </Typography>
                        </React.Fragment>
                    }
                />
                {unreadMessages.length > 0 &&
                    <ListItemIcon>
                        <Avatar
                            alt="Remy Sharp"
                            style={{
                                backgroundColor: "#3A4691",
                                fontSize: "15px",
                                color: "white",
                                position: "absolute",
                                height: "25px",
                                width: "25px",
                                top: "35px",
                                right: "10px",
                            }}
                        >
                            {unreadMessages.length}
                        </Avatar>
                    </ListItemIcon>
                }
            </ListItemButton>
            <Divider/>
        </React.Fragment>
    );
}

function truncateString(str) {
    if (str.length > 25) {
        str = str.substring(0, 22) + '...';
    }
    return str;
}

const mapDispatchToProps = {
    readMessage: readMessage,
    setSelectedRoom: setSelectedRoom
};

export default connect(null, mapDispatchToProps)(RoomListItem);
