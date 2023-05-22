import React from 'react';
import {makeStyles} from "@mui/styles";
import {Avatar} from "@mui/material";

const useStyles = makeStyles(() => ({
    root: {
        width: 'calc(100% - 301px)',
        height: '70px',
        backgroundColor: '#344195',
        position: 'fixed',
        marginLeft: '301px',
        boxSizing: 'border-box',
    },
    emailText: {
        backgroundColor: '#344195',
        position: 'fixed',
        marginTop: '25px',
        marginLeft: '85px',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        boxSizing: 'border-box',
    },
    avatar: {
        marginTop: '10px',
        marginLeft: '25px',
        height: '50px',
        width: '50px',
    },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.emailText}>
                some.email@mail.com
            </div>
            <Avatar className={classes.avatar} alt="Remy Sharp">
                B
            </Avatar>
        </div>
    );
};

export default Header;
