import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {actionEditing, actionTranslating} from "../../state/messages/actions";
import {connect, useSelector} from "react-redux";
import UserTypes from "../../constants/UserTypes";
import MessageActionContansts from "../../constants/MessageActionContansts";

const useStyles = makeStyles(() => ({
    contextMenu: {
        position: 'relative',
        right: '0',
    },
    menuItem: {
        fontSize: '0.875rem',
    },
}));

const ContextMenu = ({
                         handleClickShowSecondaryContent,
                         message,
                         secondaryContentExpanded,
                         secondaryContentLanguage,
                         setSecondaryContentLanguage,
                         actionEditing,
                         actionTranslating,
                     }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const currentUser = useSelector(state => state.users.currentUser.data);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (language, action = null) => {
        setAnchorEl(null);
        if (language) {
            setSecondaryContentLanguage(language);
            handleClickShowSecondaryContent();
            return
        }

        if (action === MessageActionContansts.EDITING) {
            actionEditing(message.id)
            return
        }

        if (action === MessageActionContansts.TRANSLATING) {
            actionTranslating(message.id, currentUser.translationLanguages[0])
            return
        }
    }

    const buildMenuItemText = (language) => {
        const showHideText = language === secondaryContentLanguage && secondaryContentExpanded ? 'Hide' : 'Show';
        return `${showHideText} ${language.toLowerCase()} translation`;
    }

    return (
        <>
            <IconButton onClick={handleClick} size="small" className={classes.contextMenu}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleMenuItemClick(null)}
            >
                {message.translations.map((translation, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleMenuItemClick(translation.language)}
                        className={classes.menuItem}
                    >
                        {buildMenuItemText(translation.language)}
                    </MenuItem>
                ))}
                {message.senderId === currentUser.id && (
                    <MenuItem
                        onClick={() => handleMenuItemClick(null, MessageActionContansts.EDITING)}
                        className={classes.menuItem}>
                        Edit
                    </MenuItem>
                )}
                {currentUser.type === UserTypes.TRANSLATOR && (
                    <MenuItem
                        onClick={() => handleMenuItemClick(null, MessageActionContansts.TRANSLATING)}
                        className={classes.menuItem}>
                        Translate
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

const mapDispatchToProps = {
    actionEditing: actionEditing,
    actionTranslating: actionTranslating,
};

export default connect(null, mapDispatchToProps)(ContextMenu);
