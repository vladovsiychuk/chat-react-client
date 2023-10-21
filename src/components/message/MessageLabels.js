import React from 'react';
import {makeStyles} from '@mui/styles';
import {Typography, Chip} from '@mui/material';
import {getUserById} from "../../state/users/selectors";
import {useSelector} from "react-redux";
import UserTypes from "../../constants/UserTypes";

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

const MessageLabels = ({alignRight = true, message}) => {
    const classes = useStyles(alignRight)();

    const currentUser = useSelector(state => state.users.currentUser.data);
    const translator = useSelector(state => getUserById(state, {id: message.translations[0]?.translatorId}))

    const waitingLabel = "Waiting for Translation";
    const editedLabel = "Edited";
    const date = new Date(message.dateCreated);
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    return (
        <div className={classes.main}>
            <div>
                {/*<Chip label={waitingLabel} className={`${classes.label} ${classes.orangeLabel}`} variant="outlined"/>*/}
                {!!message.isModified && (
                    <Chip label={editedLabel} className={`${classes.label} ${classes.greyLabel}`} variant="outlined"/>
                )}
                {currentUser.type === UserTypes.REGULAR_USER && !!translator && (
                    <Chip label={`Translated by ${translator.email}`} className={`${classes.label} ${classes.greyLabel}`} variant="outlined"/>
                )}
            </div>
            <div>
                <Typography color="textSecondary">{time}</Typography>
                {/*    <span className={classes.checkmarks}>*/}
                {/*        <span>✓</span> <span className="blue">✓</span>*/}
                {/*    </span>*/}
            </div>
        </div>
    );
};

export default MessageLabels;
