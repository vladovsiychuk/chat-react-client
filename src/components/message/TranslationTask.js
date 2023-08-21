import React from 'react';
import {makeStyles} from '@mui/styles';
import {IconButton, Select, MenuItem, Typography, Box, Input} from '@mui/material';
import {Close} from '@mui/icons-material';
import {connect, useSelector} from "react-redux";
import {getActionMessage} from "../../state/messages/selectors";
import {actionCancel, addTranslationLanguage} from "../../state/messages/actions";
import MessageActionContansts from "../../constants/MessageActionContansts";

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
        justifyContent: 'space-between',
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

const TranslationTask = ({actionCancel, addTranslationLanguage}) => {
    const classes = useStyles();
    const {messageAction} = useSelector(state => state.messages);
    const currentUser = useSelector(state => state.users.currentUser.data);
    const message = useSelector(getActionMessage);

    const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    return (
        <>
            {messageAction && (
                <Box className={classes.container}>
                    <Box className={classes.divider}/>
                    <Box className={classes.translationHeader}>
                        {messageAction.type === MessageActionContansts.TRANSLATING ? (
                            <Box className={classes.translationTitle}>
                                <Typography>Translate message to:</Typography>
                                <Select
                                    value={messageAction.data.language}
                                    onChange={e =>
                                        addTranslationLanguage(e.target.value)
                                    }
                                    className={classes.languageSelector}
                                    input={<Input disableUnderline/>}
                                >
                                    {currentUser.translationLanguages.map(lang => (
                                        <MenuItem key={lang.toLowerCase()} value={lang.toUpperCase()}>{capitalize(lang)}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        ) : (
                            <div style={{flexGrow: 1}}></div>
                        )}
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
    addTranslationLanguage: addTranslationLanguage,
};

export default connect(null, mapDispatchToProps)(TranslationTask);
