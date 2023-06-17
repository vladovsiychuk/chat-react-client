import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from "@mui/styles";
import { Dialog, DialogContent, TextField, List, ListItem, ListItemText } from "@mui/material";

const useStyles = makeStyles(() => ({
    dialogContent: {
        padding: '16px',
    },
    searchInput: {
        marginBottom: '16px',
    },
}));

const SearchDialog = () => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(['testA', 'testB', 'testC']);
    const dialogRef = useRef(null);

    const handleSearch = () => {
        // Simulating server request to get search results
        // Replace with actual server request implementation
        // Example: axios.get('/search', { params: { query: searchQuery }})
        //       .then(response => setSearchResults(response.data.results))
        setSearchResults(['result1', 'result2', 'result3']);
    };

    const handleClose = () => {
        // Handle dialog close logic here
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                console.log("Clicked outside the SearchDialog");
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogContent className={classes.dialogContent} ref={dialogRef}>
                <TextField
                    label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={classes.searchInput}
                />
                <List>
                    {searchResults.map((result, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={result} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;
