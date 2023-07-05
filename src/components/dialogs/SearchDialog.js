import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from "@mui/styles";
import {Dialog, DialogContent, List} from "@mui/material";
import UserSearch from "../user/UserSearch";
import UserSearchItem from "../user/UserSearchItem";
import {connect, useSelector} from "react-redux";
import {getUsersByType} from "../../state/users/selectors";
import {addRoomMember} from "../../state/rooms/actions";
import PropTypes from "prop-types";

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

const SearchDialog = ({type, handleSearchDialogOpen, addRoomMember}) => {
    const classes = useStyles();

    const usersFromStore = useSelector(state => getUsersByType(state, {type}))

    const selectedRoomId = useSelector(state => state.rooms.selectedRoomId)

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
        addRoomMember(selectedRoomId, userId)
        handleSearchDialogOpen()
    };

    return (
        <Dialog open={true}>
            <DialogContent className={classes.dialogContent} ref={dialogRef}>
                <UserSearch setSearchUsers={setSearchUsers} triggerQueryUpdate={triggerQueryUpdate} type={type}/>
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


SearchDialog.propTypes = {
    type: PropTypes.string.isRequired,
    handleSearchDialogOpen: PropTypes.func.isRequired,
    addRoomMember: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    addRoomMember: addRoomMember
};

export default connect(null, mapDispatchToProps)(SearchDialog);

