import React from 'react';
import {makeStyles} from '@mui/styles';
import {IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
                         setSecondaryContentLanguage
                     }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClicked = (language) => {
        setSecondaryContentLanguage(language)
        handleClickShowSecondaryContent()
    };

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
                onClose={handleClose}
            >
                {message.translations.map((translation, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleClose();
                            handleItemClicked(translation.language)
                        }}
                        className={classes.menuItem}>
                        {
                            translation.language === secondaryContentLanguage ?
                                secondaryContentExpanded ?
                                    'Hide'
                                    : 'Show'
                                : 'Show'
                        }
                        {
                            ` ${translation.language.toLowerCase()} translation`
                        }
                    </MenuItem>
                ))}
                <MenuItem
                    onClick={() => {
                        handleClose();
                    }}
                    className={classes.menuItem}>
                    'something'
                </MenuItem>
            </Menu>
        </>
    );
};

export default ContextMenu;
