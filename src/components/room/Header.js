import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Avatar, Divider} from "@mui/material";
import {useSelector} from "react-redux";
import {getSelectedRoomSelector} from "../../state/rooms/selectors";
import MemberAvatars from "../user/MemberAvatars";
import TranslatorAvatars from "../user/TranslatorAvatars";
import UserTypes from "../../constants/UserTypes";

const useStyles = makeStyles(() => ({
    root: {
        width: 'calc(100% - 301px)',
        height: '70px',
        backgroundColor: '#344195',
        position: 'fixed',
        marginLeft: '301px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
    },
    roomNameText: {
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
    },
    roomAvatar: {
        height: '50px',
        width: '50px',
        marginRight: '10px',
    },
    divider: {
        width: '2px',
        margin: 'auto 10px',
        backgroundColor: 'white',
    },
}));

const Header = () => {
    const classes = useStyles();
    const {REGULAR_USER, TRANSLATOR} = UserTypes

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


    function selectedRoomMembers(type) {
        return [...allUsers, currentUser].filter(user => selectedRoom.members.includes(user.id) && user.type === type)
    }

    return (
        <div className={classes.root}>
            <Avatar className={classes.roomAvatar} alt="Remy Sharp">
                {roomAvatar}
            </Avatar>
            <div className={classes.roomNameText}>
                {roomName}
            </div>
            <MemberAvatars
                users={selectedRoomMembers(REGULAR_USER).map(user => user.email).map(email => email.substring(0, 1))}/>
            <Divider sx={{height: '50%'}} orientation="vertical" className={classes.divider}/>
            <TranslatorAvatars
                users={selectedRoomMembers(TRANSLATOR).map(user => user.email).map(email => email.substring(0, 1))}/>
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
