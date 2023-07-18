import React from 'react';
import {makeStyles} from '@mui/styles';
import {Typography, Divider, Avatar} from '@mui/material';
import MessageLabels from "./MessageLabels";
import ContextMenu from "./ContextMenu";

const useStyles = makeStyles(() => ({
    message: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        maxWidth: '50%',
        marginLeft: 'auto',
    },
    messageContainer: {
        backgroundColor: '#f4f6f8',
        borderRadius: '10px',
        padding: '10px',
        position: 'relative',
        marginRight: '10px',
    },
    translation: {
        fontSize: '0.75em',
        marginBottom: '10px',
        color: '#607d8b',
    },
    avatar: {
        height: '50px',
        width: '50px',
        backgroundColor: '#3f51b5',
    },
    menuItem: {
        fontSize: '0.875rem',
    },
}));

const MessageItem = () => {
    const classes = useStyles();

    const messageContent = "Text of the message";
    const translatedText = "Text of the translated text will be small and above the original version";
    const avatarLetter = "V";

    return (
        <div className={classes.message}>
            <div className={classes.messageContainer}>
                <Typography className={classes.translation}>{translatedText}</Typography>
                <Divider/>
                <Typography align="right">{messageContent}</Typography>
                <MessageLabels/>
            </div>
            <Avatar className={classes.avatar}>{avatarLetter}</Avatar>
            <ContextMenu/>
        </div>
    );
};

export default MessageItem;
