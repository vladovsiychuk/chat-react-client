import React from 'react';
import {makeStyles} from "@mui/styles";
import {IconButton, TextField} from "@mui/material";
import {Send} from "@mui/icons-material";

const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        bottom: '15px',
        left: '315px',
        boxSizing: 'border-box',
        overflow: 'auto',
        width: 'calc(100% - 300px - 50px)',
        height: '50px',
        backgroundColor: '#d3d4db',
        borderRadius: '10px',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
    },
    textField: {
        width: 'calc(100% - 40px)',
        height: '40px',
        marginRight: '10px',
    },
    sendIcon: {
        color: 'blue',
        cursor: 'pointer',
        marginLeft: 'auto',
    },
}));

const MessageInput = ({message, setMessage, handleKeyPress, sendNewMessage}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                id="chattextbox"
                value={message}
                autoComplete="off"
                placeholder="Type your message ..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                size="small"
                className={classes.textField}
                onFocus={() => {
                }}
            />
            <IconButton onClick={sendNewMessage} className={classes.sendIcon}>
                <Send/>
            </IconButton>
        </div>
    );
};

export default MessageInput;