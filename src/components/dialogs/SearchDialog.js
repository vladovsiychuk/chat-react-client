import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from "@mui/styles";
import {Dialog, DialogContent, List} from "@mui/material";
import UserSearch from "../user/UserSearch";
import UserSearchItem from "../user/UserSearchItem";
import {useSelector} from "react-redux";
import {getUsersByType} from "../../state/users/selectors";

const useStyles = makeStyles(() => ({
    dialogContent: {
        padding: '16px',
        width: '300px',
        height: '600px',
    },
    searchInput: {
        marginBottom: '16px',
    },
}));

const SearchDialog = ({type, handleSearchDialogOpen}) => {
    const classes = useStyles();

    const usersFromStore = useSelector(state => getUsersByType(state, {type}))

    const dialogRef = useRef(null);
    const [searchUsers, setSearchUsers] = useState([]);
    const [triggerQueryUpdate, setTriggerQueryUpdate] = useState(0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                handleSearchDialogOpen()
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchUsersClick = (userId) => {
        // const room = rooms.find(room => room.members.includes(userId))
        //
        // if (room) {
        //     setSelectedRoom(room.id);
        //     setTriggerQueryUpdate(prevTrigger => prevTrigger + 1);
        // } else
        //     createRoom(userId)
        //
        // getUser(userId)
    };

    return (
        <Dialog open={true}>
            <DialogContent className={classes.dialogContent} ref={dialogRef}>
                <UserSearch setSearchUsers={setSearchUsers} triggerQueryUpdate={triggerQueryUpdate}/>
                {searchUsers.length > 0 ? (
                    <List>
                        {searchUsers.map((user, index) => (
                            <UserSearchItem
                                key={index}
                                user={user}
                                handleSearchUsersClick={handleSearchUsersClick}
                            />
                        ))}
                    </List>
                ) : (
                    <List>
                        {usersFromStore.map((user, index) => (
                            <UserSearchItem
                                key={index}
                                user={user}
                                handleSearchUsersClick={handleSearchUsersClick}
                            />
                        ))}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;
