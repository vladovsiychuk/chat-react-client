import React, { useState, useEffect } from 'react';
import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { createStyles, makeStyles } from '@mui/styles';
import EndpointConstants from '../../constants/EndpointConstants';
import { authorized } from '../../state/httpClient';

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

function UserSearch({ setSearchUses, tab }) {
    const classes = useStyles();
    const [query, setQuery] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            const { method, path } = EndpointConstants.SEARCH_USERS_GET;
            try {
                const response = await authorized({
                    method,
                    path: path(query),
                });
                setSearchUses(response);
            } catch {
                setSearchUses([]);
            }
        }

        if (query) {
            fetchUsers();
        } else {
            setSearchUses([]);
        }
    }, [query]);

    useEffect(() => {
        if (query) {
            setQuery('');
        }
    }, [tab]);

    function handleInputChange(event) {
        setQuery(event.target.value);
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
        </>
    );
}

export default UserSearch;
