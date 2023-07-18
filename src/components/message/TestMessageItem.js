import React from 'react';
import {makeStyles} from '@mui/styles';
import {Typography, Divider, Chip, Avatar, IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const useStyles = makeStyles(() => ({
    message: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        maxWidth: '50%',
        marginLeft: 'auto',
    },
    messageContainer: {
        backgroundColor: '#f4f6f8',
        borderRadius: '10px',
        padding: '10px',
        position: 'relative',
        marginRight: '10px',
    },
    translation: {
        fontSize: '0.75em',
        marginBottom: '10px',
        color: '#607d8b',
    },
    avatar: {
        height: '50px',
        width: '50px',
        backgroundColor: '#3f51b5',
    },
    contextMenu: {
        position: 'relative',
        right: '0',
    },
    checkmarks: {
        color: '#9e9e9e',
        '& .blue': {
            color: '#2196f3',
        },
    },
    labels: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        marginRight: '8px',
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
    menuItem: {
        fontSize: '0.875rem',
    },
}));

const TestMessageItem = () => {
    const classes = useStyles();

    const messageContent = "Text of the message";
    const translatedText = "Text of the translated text will be small and above the original version";
    const waitingLabel = "Waiting for Translation";
    const editedLabel = "Edited";
    const time = "20:30";
    const avatarLetter = "V";
    const [anchorEl, setAnchorEl] = React.useState(null);

    const menuItems = ["Menu item 1", "Menu item 2", "Menu item 3"];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.message}>
            <div className={classes.messageContainer}>
                <Typography className={classes.translation}>{translatedText}</Typography>
                <Divider/>
                <Typography align="right">{messageContent}</Typography>
                <div className={classes.labels}>
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
            </div>
            <Avatar className={classes.avatar}>{avatarLetter}</Avatar>
            <IconButton onClick={handleClick} size="small" className={classes.contextMenu}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={handleClose} className={classes.menuItem}>
                        {item}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default TestMessageItem;
