import React from 'react';
import {makeStyles} from "@mui/styles";
import {Avatar} from "@mui/material";
import MemberAvatars from "../user/MemberAvatars";
import TranslatorAvatars from "../user/TranslatorAvatars";

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
    }
}));

const Header = () => {
    const classes = useStyles();
    const roomAvatar = 'R';
    const roomName = 'test-room-name';
    const listOfUsers = ['a', 'b', 'c', 'd', 'e'];

    return (
        <div className={classes.root}>
            <Avatar
                className={classes.roomAvatar}
                alt="Remy Sharp"
            >
                {roomAvatar}
            </Avatar>
            <div className={classes.roomNameText}>{roomName}</div>
            <MemberAvatars users={listOfUsers}/>
            <TranslatorAvatars users={listOfUsers}/>
        </div>
    );
};

export default Header;
