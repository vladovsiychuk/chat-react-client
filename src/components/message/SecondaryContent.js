import React from 'react';
import {makeStyles} from '@mui/styles';
import {Typography, Divider} from '@mui/material';

const useStyles = alignRight => makeStyles(() => ({
    translation: {
        fontSize: '0.75em',
        marginBottom: '10px',
        color: '#607d8b',
        textAlign: alignRight ? 'right' : 'left',
    },
}));

const MessageItem = ({alignRight}) => {
    const classes = useStyles(alignRight)();
    const show = true

    // const translatedText = "Text of the translated text will be small and above the original version";
    const translatedText = "Text of the translated text will ";

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

