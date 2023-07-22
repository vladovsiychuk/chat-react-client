import React from 'react';
import {makeStyles} from '@mui/styles';
import {Typography, Divider} from '@mui/material';

const useStyles = makeStyles(() => ({
    translation: {
        fontSize: '0.75em',
        marginBottom: '10px',
        color: '#607d8b',
    },
}));

const MessageItem = () => {
    const classes = useStyles();
    const show = false

    const translatedText = "Text of the translated text will be small and above the original version";

    return (
        show && (
            <>
                <Typography className={classes.translation}>{translatedText}</Typography>
                <Divider/>
            </>
        )
    );
};

export default MessageItem;

