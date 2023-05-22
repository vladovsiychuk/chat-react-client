import React from 'react';
import { ListItemButton, ListItemAvatar, Avatar, Divider, ListItemText } from '@mui/material';

function UserSearchItem({ user, selectedRoom, handleSearchUsersClick }) {

    return (
        <React.Fragment>
            <ListItemButton
                onClick={() => {
                    handleSearchUsersClick(user.id);
                }}
                selected={selectedRoom === user.id}
                alignItems="flex-start"
            >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp">
                        {user.email.charAt(0)
                            .toUpperCase()}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={truncateString(user.email)}
                />
            </ListItemButton>
            <Divider></Divider>
        </React.Fragment>
    );
}

function truncateString(str) {
    if (str.length > 25) {
        str = str.substring(0, 22) + '...';
    }
    return str;
}


export default UserSearchItem;
