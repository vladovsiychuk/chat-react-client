import React, {useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import {IconButton, TextField} from '@mui/material';
import {Send} from '@mui/icons-material';
import TranslationTask from "./TranslationTask";
import {getActionMessage} from "../../state/messages/selectors";
import {useSelector} from "react-redux";

const useStyles = makeStyles(() => ({
    container: {
        position: 'absolute',
        bottom: '15px',
        left: '315px',
        boxSizing: 'border-box',
        overflow: 'auto',
        width: 'calc(100% - 300px - 50px)',
        backgroundColor: '#d3d4db',
        borderRadius: '10px',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
    },
    textField: {
        width: 'calc(100% - 40px)',
        height: '40px',
        marginRight: '10px',
        border: 'none',
        '&:focus': {
            outline: 'none',
            border: 'none',
        },
    },
    sendIcon: {
        color: 'blue',
        cursor: 'pointer',
    },
    messageRow: {
        display: 'flex',
    },
}));

const MessageInput = ({message, setMessage, handleKeyPress, sendNewMessage}) => {
    const classes = useStyles();
    const actionMessage = useSelector(state => getActionMessage(state))

    useEffect(() => {
        if (actionMessage) {
            setMessage(actionMessage.content);
        }
    }, [actionMessage])

    return (
        <>
            <TranslationTask/>
            <div className={classes.container}>
                <div className={classes.messageRow}>
                    <TextField
                        id="chattextbox"
                        value={message}
                        autoComplete="off"
                        placeholder="Type message ..."
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        size="small"
                        className={classes.textField}
                        variant="outlined"
                    />
                    <IconButton onClick={sendNewMessage} className={classes.sendIcon}>
                        <Send/>
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default MessageInput;
