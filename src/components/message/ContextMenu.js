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

const ContextMenu = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const menuItems = ["Menu item 1", "Menu item 2", "Menu item 3"];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={handleClose} className={classes.menuItem}>
                        {item}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ContextMenu;
