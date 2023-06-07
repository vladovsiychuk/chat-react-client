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
import {roomMessagesSelector} from "../../state/messages/selectors";
import {readMessage} from "../../state/messages/actions";

function RoomListItem({room, selectedRoom, setSelectedRoom, readMessage}) {

    const [lastMessage, setLastMessage] = useState('')
    const [avatar, setAvatar] = useState('')
    const [userName, setUserName] = useState('')
    const [unreadMessages, setUnreadMessages] = useState([]);

    const currentUser = useSelector(state => state.users.currentUser);
    const users = useSelector(state => state.users.users);

    const roomMessages = useSelector((state) =>
        roomMessagesSelector(state, {roomId: room.id})
    );

    useEffect(() => {
        const newUnreadMessages = roomMessages.filter(
            (message) => message.senderId !== currentUser.data.id && !message.read.includes(currentUser.data.id)
        );
        setUnreadMessages(newUnreadMessages);
    }, [roomMessages, currentUser]);

    useEffect(() => {
        const lastMessage = roomMessages.length > 0 ? roomMessages[roomMessages.length - 1].content : '';
        setLastMessage(lastMessage)
    }, [roomMessages])

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
                                {lastMessage}
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
    readMessage: readMessage
};

export default connect(null, mapDispatchToProps)(RoomListItem);
