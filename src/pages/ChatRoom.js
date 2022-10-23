import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewMessage, loadChats } from '../state/chats/actions';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { currentUserConnected, currentUserJoined } from '../state/users/actions';
import { Fab, Grid, List, ListItem, ListItemButton, ListItemText, OutlinedInput } from '@mui/material';
import { Send } from '@mui/icons-material';

var stompClient = null;

function ChatRoom({ loadChats, currentUserConnected, currentUserJoined, addNewMessage }) {
    const [tab, setTab] = useState(null);
    const [message, setMessage] = useState("")

    const chats = useSelector(state => state.chats.chats)
    const chatsAsync = useSelector(state => state.chats.async)
    const currentUser = useSelector(state => state.users.currentUser)


    useEffect(() => {
        loadChats()
        connect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        currentUserConnected(true);
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + currentUser.id + '/private', onPrivateMessage);
        userJoin();
    };

    const userJoin = () => {
        const chatMessage = {
            sender: currentUser.data.id,
            status: 'JOIN'
        };
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    };

    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case 'JOIN':
                currentUserJoined(true)
                break;
            default:
                return;
        }
    };

    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        const sender = payloadData.sender
        const receiver = payloadData.receiver
        const companion = sender === currentUser.data.id ? receiver : sender

        addNewMessage(payloadData, companion)
    };

    const onError = (err) => {
        console.log(err);
    };

    const handleMessage = (event) => {
        const { value } = event.target; //create message state
        setMessage(value);
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            const chatMessage = {
                sender: currentUser.data.id,
                receiver: tab,
                date: Date.now(),
                message: message,
                status: 'MESSAGE'
            };

            stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));

            const sender = chatMessage.sender
            const receiver = chatMessage.receiver
            const companion = sender === currentUser.data.id ? receiver : sender

            addNewMessage(chatMessage, companion)

            setMessage("")
        }
    };

    return (
        <div>
            { chatsAsync.isLoading ? (
                <div>
                    Loading
                </div>
            ) : (
                currentUser.socketData.connected && (
                    <Grid container>
                        <Grid item xs={3}>
                            <List>
                                {chats.map(chat => chat.companion).map((id, index) => (
                                    <ListItemButton onClick={() => {setTab(id)}} selected={tab === id} key={index}>
                                        <ListItemText primary={id}/>
                                    </ListItemButton>
                                ))}
                            </List>
                        </Grid>
                        {tab != null &&
                            <Grid item xs={9}>
                                <List>
                                    {chats.find(chat => chat.companion === tab).messages.map((message, index) => (
                                        <ListItem key={index}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <ListItemText align={message.sender === currentUser.data.id ? "right" : "left"} primary={message.message}/>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <ListItemText align={message.sender === currentUser.data.id ? "right" : "left"} secondary={message.date}/>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    ))}
                                </List>
                                <Grid container>
                                    <Grid item xs={11}>
                                        <OutlinedInput placeholder="Enter the message..." value={message} onChange={handleMessage} fullWidth/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Fab color="primary" aria-label="add" onClick={sendPrivateValue}>
                                            <Send />
                                        </Fab>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                )
            )}
        </div>
    );
}

ChatRoom.propTypes = {
    loadChats: PropTypes.func.isRequired,
    currentUserConnected: PropTypes.func.isRequired,
    currentUserJoined: PropTypes.func.isRequired,
    addNewMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    loadChats: loadChats,
    currentUserConnected: currentUserConnected,
    currentUserJoined: currentUserJoined,
    addNewMessage: addNewMessage
};

export default connect(null, mapDispatchToProps)(ChatRoom);
