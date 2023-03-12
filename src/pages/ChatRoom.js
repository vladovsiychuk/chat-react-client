import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewChat, addNewMessage, loadChats } from '../state/chats/actions';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { currentUserConnected, currentUserJoined } from '../state/users/actions';
import { Avatar, Button, Grid, ListItem, ListItemText, TextField } from '@mui/material';
import { ArrowBackRounded, Send } from '@mui/icons-material';
import UserListSidebar from '../components/user/UserListSidebar';

var stompClient = null;

function ChatRoom({ loadChats, currentUserConnected, currentUserJoined, addNewMessage, addNewChat }) {
    const [tab, setTab] = useState(null);
    const [message, setMessage] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);

    const chats = useSelector(state => state.chats.chats);
    const chatsAsync = useSelector(state => state.chats.async);
    const currentUser = useSelector(state => state.users.currentUser);


    useEffect(() => {
        loadChats();
        connect();
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
                currentUserJoined(true);
                break;
            default:
                return;
        }
    };

    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        const sender = payloadData.sender;
        const receiver = payloadData.receiver;
        const companion = sender === currentUser.data.id ? receiver : sender;

        addNewMessage(payloadData, companion);
    };

    const onError = (err) => {
        console.log(err);
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

            const sender = chatMessage.sender;
            const receiver = chatMessage.receiver;
            const companion = sender === currentUser.data.id ? receiver : sender;

            addNewMessage(chatMessage, companion);

            setMessage('');
        }
    };

    const userTyping = (e) => {
        e.keyCode === 13
            ? sendPrivateValue()
            : setMessage(e.target.value);
    };

    const handleSearchUsersClick = (userId) => {
        setTab(userId);
        addNewChat(userId);
    };

    return (
        <div>
            {chatsAsync.isLoading ? (
                <div>
                    Loading ...
                </div>
            ) : (
                currentUser.socketData.connected && (
                    <div>
                        <UserListSidebar
                            setSearchUsers={setSearchUsers}
                            tab={tab}
                            searchUsers={searchUsers}
                            handleSearchUsersClick={handleSearchUsersClick}
                            chats={chats}
                            setTab={setTab}
                        />
                        {tab != null &&
                            <div>
                                <div style={{
                                    width: 'calc(100% - 301px)',
                                    height: '70px',
                                    backgroundColor: '#344195',
                                    position: 'fixed',
                                    marginLeft: '301px',
                                    boxSizing: 'border-box',
                                }}>
                                    <Button size="large" style={{
                                        position: 'fixed',
                                        height: '70px',
                                        width: '100px',
                                        right: '0px',
                                    }}>

                                        <ArrowBackRounded style={{
                                            color: 'white',
                                            height: '35px',
                                            width: '35px',
                                        }} />
                                    </Button>
                                    <div style={{
                                        backgroundColor: '#344195',
                                        position: 'fixed',
                                        marginTop: '25px',
                                        marginLeft: '85px',
                                        fontSize: '18px',
                                        textAlign: 'center',
                                        color: 'white',
                                        boxSizing: 'border-box',
                                    }}>

                                        some.email@mail.com
                                    </div>
                                    <Avatar style={{
                                        marginTop: '10px',
                                        marginLeft: '25px',
                                        height: '50px',
                                        width: '50px',
                                    }}
                                            alt="Remy Sharp">
                                        B
                                    </Avatar>
                                </div>
                                <main style={{
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
                                }}>
                                    {chats.find(chat => chat.companion === tab)
                                        .messages
                                        .map((message, index) => (
                                            <ListItem key={index}>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <ListItemText align={message.sender === currentUser.data.id ? 'right' : 'left'} primary={message.message} />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <ListItemText align={message.sender === currentUser.data.id ? 'right' : 'left'} secondary={message.date} />
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        ))}
                                </main>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    left: '315px',
                                    boxSizing: 'border-box',
                                    overflow: 'auto',
                                    width: 'calc(100% - 300px - 50px)',
                                    height: '50px',
                                    backgroundColor: '#d3d4db',
                                    borderRadius: '10px',
                                    padding: '5px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>

                                    <TextField
                                        id="chattextbox"
                                        autoComplete="off"
                                        placeholder="Type your message ..."
                                        onKeyUp={(e) => userTyping(e)}
                                        size={'small'}
                                        style={{
                                            width: 'calc(100% - 40px)',
                                            height: '40px',
                                            marginRight: '10px',
                                        }}
                                        onFocus={() => {
                                        }}
                                    ></TextField>
                                    <Send onClick={sendPrivateValue} style={{
                                        color: 'blue',
                                        cursor: 'pointer',
                                        marginLeft: 'auto',
                                    }}></Send>
                                </div>
                            </div>
                        }
                    </div>
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
    addNewChat: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    loadChats: loadChats,
    currentUserConnected: currentUserConnected,
    currentUserJoined: currentUserJoined,
    addNewMessage: addNewMessage,
    addNewChat: addNewChat,
};

export default connect(null, mapDispatchToProps)(ChatRoom);
