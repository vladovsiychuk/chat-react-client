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

function UserListItem({ userId, tab, setTab }) {

    return (
        <React.Fragment>
            <ListItemButton
                onClick={() => {
                    setTab(userId);
                }}
                selected={tab === userId}
                alignItems="flex-start"
            >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp">A</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={userId}
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
            <Divider />
        </React.Fragment>
    );
}

export default UserListItem;
