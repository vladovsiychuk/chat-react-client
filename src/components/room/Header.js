import React from 'react';
import {makeStyles} from "@mui/styles";
import {Avatar} from "@mui/material";
import {useSelector} from "react-redux";
import {roomMessagesSelector} from "../../state/messages/selectors";
import {getUsers} from "../../state/users/selectors";

const useStyles = makeStyles(() => ({
    root: {
        width: 'calc(100% - 301px)',
        height: '70px',
        backgroundColor: '#344195',
        position: 'fixed',
        marginLeft: '301px',
        boxSizing: 'border-box',
    },
    emailText: {
        backgroundColor: '#344195',
        position: 'fixed',
        marginTop: '25px',
        marginLeft: '85px',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        boxSizing: 'border-box',
    },
    avatar: {
        marginTop: '15px',
        marginLeft: '25px',
        height: '50px',
        width: '50px',
    },
}));

const Header = ({selectedRoomId}) => {
    const classes = useStyles();

    const currentUser = useSelector(state => state.users.currentUser.data);

    const selectedRoom = useSelector((state) =>
        roomMessagesSelector(state, {roomId: selectedRoomId})
    );

    function listOfMembers(memberIds) {
        const roomMembers = useSelector((state) =>
            getUsers(state, {userIds: memberIds})
        );

        return capitalizeAndJoin(roomMembers.map(member => member.username ? member.username : member.email))
    }

    const roomName = selectedRoom.name ?
        selectedRoom.name :
        selectedRoom.members.length === 2 ?
            selectedRoom.members.find(member => member.id !== currentUser.id).email :
            listOfMembers(selectedRoom.members)

    const roomAvatar = selectedRoom.members.length === 2 ?
        selectedRoom.members.find(member => member.id !== currentUser.id).email.substring(0, 1) :
        'i'


    return (
        <div className={classes.root}>
            <div className={classes.emailText}>
                {roomName}
            </div>
            <Avatar className={classes.avatar} alt="Remy Sharp">
                {roomAvatar}
            </Avatar>
        </div>
    );
};

function capitalizeAndJoin(list) {
    const result = [];

    for (let i = 0; i < list.length; i++) {
        const word = list[i];

        if (word.length >= 3) {
            const substring = word.substring(0, 3);
            const capitalized = substring.charAt(0).toUpperCase() + substring.slice(1);
            result.push(capitalized);
        }
    }

    return result.join(", ");
}

export default Header;
