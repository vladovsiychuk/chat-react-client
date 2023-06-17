import React from 'react';
import {makeStyles} from "@mui/styles";
import {Avatar, IconButton} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const useStyles = makeStyles(() => ({
    avatarsContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px',
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
    addButton: {
        color: 'white',
        marginRight: '10px',
    },
    addIcon: {
        color: 'white',
    },
}));

const TranslatorAvatars = ({users}) => {
    const classes = useStyles();

    const renderAvatars = () => {
        if (users.length <= 2) {
            return users.map((user, index) => (
                <Avatar
                    sx={{width: 30, height: 30}}
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
                            sx={{width: 30, height: 30}}
                            key={index}
                            className={classes.avatar}
                            alt={user}
                        >
                            {user}
                        </Avatar>
                    ))}
                    <Avatar sx={{width: 30, height: 30}} className={classes.avatarNumber}>
                        2+
                    </Avatar>
                </>
            );
        }
    };

    const handleAddUser = () => {
        // Add logic for adding a new user
        console.log('Add user clicked');
    };

    return (
        <div className={classes.avatarsContainer}>
            <span style={{color: 'white', marginRight: '20px'}}>Translators: </span>
            {renderAvatars()}
            <IconButton
                className={classes.addButton}
                onClick={handleAddUser}
                aria-label="Add User"
            >
                <PersonAddIcon className={classes.addIcon}/>
            </IconButton>
        </div>
    );
};

export default TranslatorAvatars;
