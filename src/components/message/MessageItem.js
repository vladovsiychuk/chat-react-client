import React from 'react';
import {makeStyles} from '@mui/styles';
import {Typography, Avatar} from '@mui/material';
import MessageLabels from "./MessageLabels";
import ContextMenu from "./ContextMenu";
import {useSelector} from "react-redux";
import SecondaryContent from "./SecondaryContent";

const useStyles = alignRight => makeStyles(() => ({
    message: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'flex-end',
        maxWidth: '50%',
        marginLeft: alignRight ? 'auto' : '0',
        marginRight: alignRight ? '0' : 'auto',
        flexDirection: alignRight ? 'row' : 'row-reverse',
        justifyContent: 'flex-end'
    },
    messageContainer: {
        backgroundColor: '#f4f6f8',
        borderRadius: '10px',
        padding: '10px',
        position: 'relative',
        marginRight: alignRight ? '10px' : '0px',
        marginLeft: alignRight ? '0px' : '10px',
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

const useCurrentUserMessage = (message) => {
    const currentUser = useSelector(state => state.users.currentUser.data);
    return message.senderId === currentUser.id;
}

const useMessageSender = (message, currentUserMessage) => {
    const users = useSelector(state => state.users.users);
    const currentUser = useSelector(state => state.users.currentUser.data);
    return currentUserMessage ?
        currentUser
        :
        users.find(user => user.id === message.senderId);
}

const MessageItem = ({message}) => {
    const currentUserMessage = useCurrentUserMessage(message);
    const messageSender = useMessageSender(message, currentUserMessage);
    const classes = useStyles(currentUserMessage)();

    return (
        <div className={classes.message}>
            <div className={classes.messageContainer}>
                <SecondaryContent alignRight={currentUserMessage}/>
                <Typography align={currentUserMessage ? "right" : "left"}>{message.content}</Typography>
                <MessageLabels alignRight={currentUserMessage}/>
            </div>
            <Avatar className={classes.avatar}>{messageSender.email.substring(0, 1)}</Avatar>
            <ContextMenu/>
        </div>
    );
};

export default MessageItem;

