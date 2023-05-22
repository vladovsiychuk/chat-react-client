import React from "react";
import {
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemIcon,
    Typography,
    Divider,
} from "@mui/material";
import {useSelector} from "react-redux";

function RoomListItem({room, selectedRoom, setSelectedRoom}) {

    const currentUser = useSelector(state => state.users.currentUser);
    const users = useSelector(state => state.users.users);
    const members = room.members.filter(member => member !== currentUser.data.id)

    const avatar = members.length === 1 ?
        (users.length > 0 ? users.find(user => user.id === members[0]).email.charAt(0) : null)
        : null;

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
                    primary={"primary text"}
                    secondary={
                        <React.Fragment>
                            <Typography component="span" color="textPrimary">
                                Some last message here
                            </Typography>
                        </React.Fragment>
                    }
                />
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
                        1
                    </Avatar>
                </ListItemIcon>
            </ListItemButton>
            <Divider/>
        </React.Fragment>
    );
}

export default RoomListItem;
