import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createRoom, loadRooms} from '../state/rooms/actions';
import {currentUserConnected, currentUserJoined, getUser, loadUsers} from '../state/users/actions';
import UserListSidebar from '../components/user/UserListSidebar';
import {getAccessToken} from '../state/middleware/authMiddleware';
import {addNewMessage, loadMessages, sendMessage} from "../state/messages/actions";
import {roomMessagesSelector} from "../state/messages/selectors";
import Header from "../components/room/Header";
import MessagesList from "../components/message/MessagesList";
import MessageInput from "../components/message/MessageInput";


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
                                <MessagesList roomMessages={roomMessages} currentUser={currentUser}/>
                                <MessageInput
                                    message={message}
                                    setMessage={setMessage}
                                    handleKeyPress={handleKeyPress}
                                    sendNewMessage={sendNewMessage}
                                />
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
