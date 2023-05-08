import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNewChat, addNewMessage, loadRooms} from '../state/rooms/actions';
import {currentUserConnected, currentUserJoined, loadUsers} from '../state/users/actions';
import {Avatar, Button, Grid, ListItem, ListItemText, TextField} from '@mui/material';
import {ArrowBackRounded, Send} from '@mui/icons-material';
import UserListSidebar from '../components/user/UserListSidebar';
import {getAccessToken} from '../state/middleware/authMiddleware';
import {loadMessages} from "../state/messages/actions";


function ChatRoom({
                      loadRooms,
                      loadMessages,
                      loadUsers,
                      currentUserConnected,
                      currentUserJoined,
                      addNewMessage,
                      addNewChat
                  }) {

    const [tab, setTab] = useState(null);
    const [searchUsers, setSearchUsers] = useState([]);

    const rooms = useSelector(state => state.rooms.rooms);
    const chatsAsync = useSelector(state => state.rooms.async);
    const currentUser = useSelector(state => state.users.currentUser);

    const [message, setMessage] = useState('');

    const token = getAccessToken();


    useEffect(() => {
        loadRooms();
        loadMessages();
        loadUsers();
        connect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const connect = () => {
        const ws = new WebSocket(`ws://localhost:8082/ws/chat/${currentUser.data.id}?access_token=${token}`);

        ws.onopen = () => {
            currentUserConnected(true);
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            console.log(`Received message: ${event.data}`);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            ws.close();
        };
    };


    const userTyping = (e) => {
        e.keyCode === 13
            ? console.log("Pressed Enter")
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
                            rooms={rooms}
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
                                        }}/>
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
                                    {rooms.find(chat => chat.companion === tab)
                                        .messages
                                        .map((message, index) => (
                                            <ListItem key={index}>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <ListItemText
                                                            align={message.sender === currentUser.data.id ? 'right' : 'left'}
                                                            primary={message.message}/>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <ListItemText
                                                            align={message.sender === currentUser.data.id ? 'right' : 'left'}
                                                            secondary={message.date}/>
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
                                    <Send style={{
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
    loadRooms: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired,
    currentUserConnected: PropTypes.func.isRequired,
    currentUserJoined: PropTypes.func.isRequired,
    addNewMessage: PropTypes.func.isRequired,
    addNewChat: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    loadRooms: loadRooms,
    loadMessages: loadMessages,
    loadUsers: loadUsers,
    currentUserConnected: currentUserConnected,
    currentUserJoined: currentUserJoined,
    addNewMessage: addNewMessage,
    addNewChat: addNewChat,
};

export default connect(null, mapDispatchToProps)(ChatRoom);
