import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {IconButton, TextField, Select, MenuItem, Typography, Box} from '@mui/material';
import {Send, Close} from '@mui/icons-material';

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

const TestMessageInput = () => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [showTranslationTask, setShowTranslationTask] = useState(true);
    const [language, setLanguage] = useState('english');

    const originalMessage = "original message that is going to be translated"

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log("message sent!")
            setMessage('')
        }
    };

    return (
        <>
            {showTranslationTask && (
                <Box className={classes.translationContainer}>
                    <Box className={classes.divider}/>
                    <Box className={classes.translationHeader}>
                        <Box>
                            <Typography className={classes.translationTitle}>
                                Translate message to:
                            </Typography>
                            <Select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className={classes.languageSelector}
                                disableUnderline
                            >
                                <MenuItem value='english'>English</MenuItem>
                                <MenuItem value='spanish'>Spanish</MenuItem>
                                <MenuItem value='french'>French</MenuItem>
                                <MenuItem value='german'>German</MenuItem>
                            </Select>
                        </Box>
                        <IconButton onClick={() => setShowTranslationTask(false)}>
                            <Close/>
                        </IconButton>
                    </Box>
                    <Typography>{originalMessage}</Typography>
                </Box>
            )}
            <div className={classes.container}>
                <div className={classes.messageRow}>
                    <TextField
                        id="chattextbox"
                        value={message}
                        autoComplete="off"
                        placeholder="Type your translation ..."
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        size="small"
                        className={classes.textField}
                        variant="outlined"
                    />
                    <IconButton onClick={() => {
                        console.log("message sent!")
                        setMessage('')
                    }} className={classes.sendIcon}>
                        <Send/>
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default TestMessageInput;
