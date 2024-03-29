import React, {useState, useEffect} from 'react';
import {InputBase} from '@mui/material';
import {Search} from '@mui/icons-material';
import {createStyles, makeStyles} from '@mui/styles';
import EndpointConstants from '../../constants/EndpointConstants';
import {authorized} from '../../state/httpClient';
import {useSelector} from "react-redux";

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

function UserSearch({setSearchUsers, triggerQueryUpdate, type = null}) {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const selectedRoom = useSelector(state => state.rooms.selectedRoomId)

    useEffect(() => {
        async function fetchUsers() {
            const {method, path} = EndpointConstants.USER_LIST;
            try {
                const response = await authorized({
                    method,
                    path: path(query, type),
                });
                setSearchUsers(response);
            } catch {
                setSearchUsers([]);
            }
        }

        if (query) {
            fetchUsers();
        } else {
            setSearchUsers([]);
        }
    }, [query, setSearchUsers]);

    useEffect(() => {
        if (selectedRoom) {
            setQuery('');
        }
    }, [selectedRoom, triggerQueryUpdate]);


    return (
        <>
            <div className={classes.searchContainer}>
                <Search className={classes.search}/>
                <InputBase
                    placeholder="Search users"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className={classes.input}
                    inputProps={{'aria-label': 'search users'}}
                />
            </div>
        </>
    );
}

export default UserSearch;
