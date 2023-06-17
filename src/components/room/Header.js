import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Avatar} from "@mui/material";
import {useSelector} from "react-redux";
import {getSelectedRoomSelector} from "../../state/rooms/selectors";

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

const Header = () => {
    const classes = useStyles();

    const [roomName, setRoomName] = useState('')
    const [roomAvatar, setRoomAvatar] = useState('')

    const currentUser = useSelector(state => state.users.currentUser.data);

    const selectedRoom = useSelector(state => getSelectedRoomSelector(state))

    const allUsers = useSelector(state => state.users.users)


    useEffect(() => {
        function listOfMembers(memberIds) {
            const roomMembers = allUsers.filter(user => memberIds.includes(user.id))

            return capitalizeAndJoin(roomMembers.map(member => member.username ? member.username : member.email))
        }

        if (selectedRoom) {
            const calculatedRoomName = selectedRoom.name ?
                selectedRoom.name :
                selectedRoom.members.length === 2 ?
                    allUsers.find(user => user.id === selectedRoom.members.find(member => member !== currentUser.id))?.email :
                    listOfMembers(selectedRoom.members)

            const calculatedRoomAvatar = selectedRoom.members.length === 2 ?
                allUsers.find(user => user.id === selectedRoom.members.find(member => member !== currentUser.id))?.email?.substring(0, 1) :
                'i'

            setRoomName(calculatedRoomName)
            setRoomAvatar(calculatedRoomAvatar)
        }
    }, [selectedRoom, currentUser.id, allUsers])


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
