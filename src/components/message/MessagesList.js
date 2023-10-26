import React, {useEffect, useRef, useState} from 'react';
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
    const currentUser = useSelector(state => state.users.currentUser.data);
    const roomMessages = useSelector(state => getSelectedRoomMessages(state));
    const scrollRef = useRef(null);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

    useEffect(() => {
        const lastMessage = roomMessages[roomMessages.length - 1];

        if (shouldScrollToBottom || isFirstRender || (lastMessage && lastMessage.senderId === currentUser.id)) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            setIsFirstRender(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomMessages, currentUser]);

    const handleScroll = () => {
        const isAtBottom = scrollRef.current.scrollTop + scrollRef.current.clientHeight >= scrollRef.current.scrollHeight;
        setShouldScrollToBottom(isAtBottom);
    };

    return (
        <main className={classes.main} ref={scrollRef} onScroll={handleScroll}>
            {roomMessages.map((message, index) => (
                <MessageItem message={message} key={index}/>
            ))}
        </main>
    );
};

export default MessagesList;
