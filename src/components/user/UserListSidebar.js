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

function UserListSidebar({setSearchUsers, tab, searchUsers, handleSearchUsersClick, rooms, setTab}) {
    const classes = useStyles();

    return (
        <main className={classes.main}>
            <UserSearch setSearchUses={setSearchUsers} tab={tab}/>

            {searchUsers.length > 0 ? (
                <List>
                    {searchUsers.map((user, index) => (
                        <UserSearchItem
                            key={index}
                            user={user}
                            tab={tab}
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
                                tab={tab}
                                setTab={setTab}
                            />
                        ))}
                </List>
            )}
        </main>
    );
}

export default UserListSidebar;
