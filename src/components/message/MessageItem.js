import React, {useState} from 'react';
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

const MessageItem = ({message}) => {
    const users = useSelector(state => state.users.users);
    const currentUser = useSelector(state => state.users.currentUser.data);
    const isCurrentUserMessage = message.senderId === currentUser.id;
    const messageSender = isCurrentUserMessage ? currentUser : users.find(user => user.id === message.senderId);
    const classes = useStyles(isCurrentUserMessage)();

    const [showSecondaryContent, setShowSecondaryContent] = useState(false);
    const [secondaryContentLanguage, setSecondaryContentLanguage] = useState(null);

    const handleClickShowSecondaryContent = () => {
        setShowSecondaryContent(!showSecondaryContent)
    }

    const alignment = isCurrentUserMessage ? "right" : "left";

    return (
        <div className={classes.message}>
            <div className={classes.messageContainer}>
                {showSecondaryContent && (
                    <SecondaryContent
                        alignRight={isCurrentUserMessage}
                        message={message}
                        selectedTranslation={secondaryContentLanguage}
                    />
                )}
                <Typography align={alignment}>{message.content}</Typography>
                <MessageLabels alignRight={isCurrentUserMessage} message={message}/>
            </div>
            <Avatar className={classes.avatar}>{messageSender.email.substring(0, 1)}</Avatar>
            <ContextMenu
                handleClickShowSecondaryContent={handleClickShowSecondaryContent}
                message={message}
                secondaryContentExpanded={showSecondaryContent}
                secondaryContentLanguage={secondaryContentLanguage}
                setSecondaryContentLanguage={setSecondaryContentLanguage}
            />
        </div>
    );
};

export default MessageItem;
