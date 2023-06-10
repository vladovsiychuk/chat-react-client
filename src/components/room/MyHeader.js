import React from 'react';
import {makeStyles} from "@mui/styles";
import {Avatar} from "@mui/material";

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
    avatarsContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    avatar: {
        marginLeft: '-15px',
        zIndex: '1',
        border: '2px solid #344195',
    },
    avatarNumber: {
        marginLeft: '-15px',
        zIndex: '1',
        backgroundColor: 'white',
        color: '#344195',
        fontWeight: 'bold',
        border: '2px solid #344195',
    },
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
            <div className={classes.avatarsContainer}>
                <span style={{color: 'white', marginRight: '20px'}}>Users: </span>
                {listOfUsers.slice(0, 2).map((user, index) => (
                    <Avatar
                        key={index}
                        className={classes.avatar}
                        alt={user}
                    >
                        {user}
                    </Avatar>
                ))}
                {listOfUsers.length > 2 && (
                    <Avatar className={classes.avatarNumber}>
                        2+
                    </Avatar>
                )}
            </div>
        </div>
    );
};

export default Header;
