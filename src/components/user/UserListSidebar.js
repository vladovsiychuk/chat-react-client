import React from 'react';
import {createStyles, makeStyles} from '@mui/styles';
import UserSearch from './UserSearch';
import {List} from '@mui/material';
import UserSearchItem from './UserSearchItem';
import RoomListItem from './RoomListItem';

const useStyles = makeStyles(() =>
    createStyles({
        main: {
            height: 'calc(100% - 70px)',
            position: 'absolute',
            top: '70px',
            left: '0',
            width: '300px',
            boxShadow: '0px 0px 1px black',
        },
    })
);

function UserListSidebar({
                             setSearchUsers,
                             selectedRoom,
                             searchUsers,
                             handleSearchUsersClick,
                             rooms,
                             setSelectedRoom,
                             triggerQueryUpdate
                         }) {
    const classes = useStyles();

    return (
        <main className={classes.main}>
            <UserSearch setSearchUsers={setSearchUsers} selectedRoom={selectedRoom}
                        triggerQueryUpdate={triggerQueryUpdate}/>

            {searchUsers.length > 0 ? (
                <List>
                    {searchUsers.map((user, index) => (
                        <UserSearchItem
                            key={index}
                            user={user}
                            selectedRoom={selectedRoom}
                            handleSearchUsersClick={handleSearchUsersClick}
                        />
                    ))}
                </List>
            ) : (
                <List>
                    {rooms
                        .map((room, index) => (
                            <RoomListItem
                                key={index}
                                room={room}
                                selectedRoom={selectedRoom}
                                setSelectedRoom={setSelectedRoom}
                            />
                        ))}
                </List>
            )}
        </main>
    );
}

export default UserListSidebar;
