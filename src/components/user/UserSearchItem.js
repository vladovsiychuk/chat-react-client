import React from 'react';
import { ListItemButton, ListItemAvatar, Avatar, Divider } from '@mui/material';

function UserSearchItem(props) {
    const { user, tab, handleSearchUsersClick } = props;

    return (
        <React.Fragment>
            <ListItemButton
                onClick={() => {
                    handleSearchUsersClick(user.id);
                }}
                selected={tab === user.id}
                alignItems="flex-start"
            >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp">
                        {user.email.charAt(0)
                            .toUpperCase()}
                    </Avatar>
                </ListItemAvatar>
            </ListItemButton>
            <Divider></Divider>
        </React.Fragment>
    );
}

export default UserSearchItem;
