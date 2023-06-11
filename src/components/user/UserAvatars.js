import React from 'react';
import {makeStyles} from "@mui/styles";
import {Avatar} from "@mui/material";

const useStyles = makeStyles(() => ({
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

const UserAvatars = ({users}) => {
    const classes = useStyles();

    const renderAvatars = () => {
        if (users.length <= 2) {
            return users.map((user, index) => (
                <Avatar
                    key={index}
                    className={classes.avatar}
                    alt={user}
                >
                    {user}
                </Avatar>
            ));
        } else {
            return (
                <>
                    {users.slice(0, 2).map((user, index) => (
                        <Avatar
                            key={index}
                            className={classes.avatar}
                            alt={user}
                        >
                            {user}
                        </Avatar>
                    ))}
                    <Avatar className={classes.avatarNumber}>
                        2+
                    </Avatar>
                </>
            );
        }
    };

    return (
        <div className={classes.avatarsContainer}>
            <span style={{color: 'white', marginRight: '20px'}}>Users: </span>
            {renderAvatars()}
        </div>
    );
};

export default UserAvatars
