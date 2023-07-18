import React from 'react';
import {makeStyles} from "@mui/styles";
import {useSelector} from "react-redux";
import {getSelectedRoomMessages} from "../../state/messages/selectors";
import MessageItem from "./MessageItem";

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

const MessagesList = () => {
    const classes = useStyles();

    const roomMessages = useSelector(state => getSelectedRoomMessages(state))

    return (
        <main className={classes.main}>
            {roomMessages.map((message, index) => (
                <MessageItem/>
            ))}
        </main>
    );
};

export default MessagesList;
