import React from 'react';
import {makeStyles} from '@mui/styles';
import {Typography, Divider, Chip, Avatar, IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const useStyles = alignRight => makeStyles(() => ({
    main: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: alignRight ? 'row' : 'row-reverse',
    },
    checkmarks: {
        color: '#9e9e9e',
        '& .blue': {
            color: '#2196f3',
        },
    },
    label: {
        marginRight: alignRight ? '8px' : '0px',
        marginLeft: alignRight ? '0px' : '8px',
        fontSize: '0.75em', // Reduced font size
        fontWeight: 'normal', // Normal font weight
    },
    greyLabel: {
        borderColor: '#9e9e9e',
        color: '#9e9e9e',
    },
    orangeLabel: {
        borderColor: '#ff5722',
        color: '#ff5722', // Make label orange
    },
}));

const MessageLabels = ({alignRight = true}) => {
    const classes = useStyles(alignRight)();

    const waitingLabel = "Waiting for Translation";
    const editedLabel = "Edited";
    const time = "20:30";

    return (
        <div className={classes.main}>
            <div>
                <Chip label={waitingLabel} className={`${classes.label} ${classes.orangeLabel}`} variant="outlined"/>
                <Chip label={editedLabel} className={`${classes.label} ${classes.greyLabel}`} variant="outlined"/>
            </div>
            <div>
                <Typography color="textSecondary">{time}</Typography>
                <span className={classes.checkmarks}>
                    <span>✓</span> <span className="blue">✓</span>
                </span>
            </div>
        </div>
    );
};

export default MessageLabels;
