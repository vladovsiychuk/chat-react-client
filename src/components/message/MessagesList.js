import React from 'react';
import {makeStyles} from "@mui/styles";
import {Grid, ListItem, ListItemText} from "@mui/material";

const useStyles = makeStyles(() => ({
    main: {
        height: 'calc(100vh - 100px)',
        overflow: 'auto',
        padding: '25px',
        marginLeft: '300px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        top: '70px',
        paddingBottom: '50px',
        width: 'calc(100% - 300px)',
        position: 'absolute',
    },
}));

const MessagesList = ({ roomMessages, currentUser }) => {
    const classes = useStyles();

    return (
        <main className={classes.main}>
            {roomMessages.map((message, index) => (
                <ListItem key={index}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText
                                align={message.senderId === currentUser.data.id ? 'right' : 'left'}
                                primary={message.content}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText
                                align={message.senderId === currentUser.data.id ? 'right' : 'left'}
                                secondary={message.dateCreated}
                            />
                        </Grid>
                    </Grid>
                </ListItem>
            ))}
        </main>
    );
};

export default MessagesList;
