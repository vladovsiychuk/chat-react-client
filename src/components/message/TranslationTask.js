import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {IconButton, Select, MenuItem, Typography, Box, Input} from '@mui/material';
import {Close} from '@mui/icons-material';
import {connect, useSelector} from "react-redux";
import {getActionMessage} from "../../state/messages/selectors";
import {actionCancel} from "../../state/messages/actions";

const useStyles = makeStyles(() => ({
    container: {
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
}));

const TranslationTask = ({actionCancel}) => {
    const classes = useStyles();
    const [language, setLanguage] = useState('english');

    const showTranslationTask = !!useSelector(state => state.messages.messageAction)
    const message = useSelector(state => getActionMessage(state))

    return (
        <>
            {showTranslationTask && (
                <Box className={classes.container}>
                    <Box className={classes.divider}/>
                    <Box className={classes.translationHeader}>
                        <Box className={classes.translationTitle}>
                            <Typography>
                                Translate message to:
                            </Typography>
                            <Select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className={classes.languageSelector}
                                input={<Input disableUnderline/>}
                            >
                                <MenuItem value='english'>English</MenuItem>
                                <MenuItem value='spanish'>Spanish</MenuItem>
                                <MenuItem value='french'>French</MenuItem>
                                <MenuItem value='german'>German</MenuItem>
                            </Select>
                        </Box>
                        <IconButton onClick={actionCancel}>
                            <Close/>
                        </IconButton>
                    </Box>
                    <Typography>{message.content}</Typography>
                </Box>
            )}
        </>
    );
};

const mapDispatchToProps = {
    actionCancel: actionCancel,
};

export default connect(null, mapDispatchToProps)(TranslationTask);
