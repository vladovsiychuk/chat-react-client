import React, { useState, useEffect } from 'react';
import { InputBase, List, ListItem, ListItemText, Paper, Popper, ClickAwayListener } from '@mui/material';
import { Search } from '@mui/icons-material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
    createStyles({
        searchContainer: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            margin: '8px 0',
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box'
        },
        search: {
            marginRight: '8px',
            color: '#9e9e9e',
        },
        input: {
            flexGrow: 1,
        },
        list: {
            maxHeight: '200px',
            overflowY: 'auto',
        },
        listItem: {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
        },
    })
);

function UserSearch() {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch(`https://your-backend-api.com/users?query=${query}`);
            const data = await response.json();
            setUsers(data);
        }

        if (query) {
            fetchUsers();
        } else {
            setUsers([]);
        }
    }, [query]);

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    function handleListItemClick(user) {
        console.log(user);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <>
            <div className={classes.searchContainer}>
                <Search className={classes.search} />
                <InputBase
                    placeholder="Search users"
                    value={query}
                    onChange={handleInputChange}
                    className={classes.input}
                    inputProps={{ 'aria-label': 'search users' }}
                />
            </div>

            {users.length > 0 && (
                <ClickAwayListener onClickAway={handleClose}>
                    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start">
                        <Paper >
                            <List className={classes.list}>
                                {users.map((user) => (
                                    <ListItem key={user.id} className={classes.listItem} onClick={() => handleListItemClick(user)}>
                                        <ListItemText primary={user.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Popper>
                </ClickAwayListener>
            )}
        </>
    );
}

export default UserSearch;
