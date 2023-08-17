import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {actionEditing} from "../../state/messages/actions";
import {connect} from "react-redux";

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
                     }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (language) => {
        setAnchorEl(null);
        if (language) {
            setSecondaryContentLanguage(language);
            handleClickShowSecondaryContent();
        }
        actionEditing(message.id)
    };

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
                <MenuItem
                    onClick={() => handleMenuItemClick(null)}
                    className={classes.menuItem}>
                    Edit
                </MenuItem>
            </Menu>
        </>
    );
};

const mapDispatchToProps = {
    actionEditing: actionEditing,
};

export default connect(null, mapDispatchToProps)(ContextMenu);
