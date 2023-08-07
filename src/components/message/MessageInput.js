import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {IconButton, TextField, Select, MenuItem, Typography, Box, Input} from '@mui/material';
import {Send, Close} from '@mui/icons-material';
import TranslationTask from "./TranslationTask";

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
    translationContainer: {
        position: 'absolute',
        bottom: '15px',
        left: '315px',
        backgroundColor: '#ffffff',
        marginBottom: '50px',
        overflow: 'auto',
        width: 'calc(100% - 300px - 50px)',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
    },
    translationHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // change here
    },
    translationTitle: {
        display: 'flex',
        alignItems: 'center',
        color: 'blue',
        fontWeight: 'bold',
        marginRight: '5px',
    },
    languageSelector: {
        fontSize: '0.8rem',
        padding: '0px',
        height: '1.5em',
        marginLeft: '5px',
    },
    divider: {
        width: '100%',
        height: '1px',
        border: 'none',
        backgroundColor: '#000000',
        margin: '10px 0',
    },
    messageRow: {
        display: 'flex',
    },
}));

const MessageInput = ({message, setMessage, handleKeyPress, sendNewMessage}) => {
    const classes = useStyles();

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
