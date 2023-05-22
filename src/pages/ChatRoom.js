import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createRoom, loadRooms} from '../state/rooms/actions';
import {currentUserConnected, currentUserJoined, getUser, loadUsers} from '../state/users/actions';
import { Grid, ListItem, ListItemText, TextField} from '@mui/material';
import { Send} from '@mui/icons-material';
import UserListSidebar from '../components/user/UserListSidebar';
import {getAccessToken} from '../state/middleware/authMiddleware';
import {addNewMessage, loadMessages, sendMessage} from "../state/messages/actions";
import {roomMessagesSelector} from "../state/messages/selectors";
import Header from "../components/room/Header";


function ChatRoom({
                      loadRooms,
                      createRoom,
                      loadMessages,
                      sendMessage,
                      loadUsers,
                      currentUserConnected,
                      currentUserJoined,
                      addNewMessage,
                      getUser,
                  }) {

    const [tab, setTab] = useState(null);
    const [searchUsers, setSearchUsers] = useState([]);

    const rooms = useSelector(state => state.rooms.rooms);
    const chatsAsync = useSelector(state => state.rooms.async);
    const currentUser = useSelector(state => state.users.currentUser);

    const [message, setMessage] = useState('');

    const token = getAccessToken();


    const roomMessages = useSelector((state) =>
        roomMessagesSelector(state, {roomId: tab})
    );


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
            addNewMessage(event.data)
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            ws.close();
        };
    };


    function sendNewMessage() {
        sendMessage(tab, message)
        setMessage('')
    }

    const handleSearchUsersClick = (userId) => {
        const room = rooms.find(room => room.members.includes(userId))

        if (room)
            setTab(userId);
        else
            createRoom(userId, setTab)

        getUser(userId)
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendNewMessage()
        }
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
                                <Header/>
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
                                    {roomMessages
                                        .map((message, index) => (
                                            <ListItem key={index}>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <ListItemText
                                                            align={message.senderId === currentUser.data.id ? 'right' : 'left'}
                                                            primary={message.content}/>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <ListItemText
                                                            align={message.senderId === currentUser.data.id ? 'right' : 'left'}
                                                            secondary={message.dateCreated}/>
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
                                        value={message}
                                        autoComplete="off"
                                        placeholder="Type your message ..."
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        size={'small'}
                                        style={{
                                            width: 'calc(100% - 40px)',
                                            height: '40px',
                                            marginRight: '10px',
                                        }}
                                        onFocus={() => {
                                        }}
                                    />
                                    <Send onClick={sendNewMessage} style={{
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
    createRoom: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired,
    currentUserConnected: PropTypes.func.isRequired,
    currentUserJoined: PropTypes.func.isRequired,
    addNewMessage: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    loadRooms: loadRooms,
    createRoom: createRoom,
    loadMessages: loadMessages,
    sendMessage: sendMessage,
    loadUsers: loadUsers,
    currentUserConnected: currentUserConnected,
    currentUserJoined: currentUserJoined,
    addNewMessage: addNewMessage,
    getUser: getUser,
};

export default connect(null, mapDispatchToProps)(ChatRoom);
