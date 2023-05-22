import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createRoom, loadRooms} from '../state/rooms/actions';
import {currentUserConnected, getUser, loadUsers} from '../state/users/actions';
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
                      addNewMessage,
                      getUser,
                  }) {

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [searchUsers, setSearchUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [headerAvatar, setHeaderAvatar] = useState(null)
    const [headerUsername, setHeaderUsername] = useState('')

    const rooms = useSelector(state => state.rooms.rooms);
    const users = useSelector(state => state.users.users);
    const chatsAsync = useSelector(state => state.rooms.async);
    const currentUser = useSelector(state => state.users.currentUser);

    const token = getAccessToken();


    const selectedRoomMessages = useSelector((state) =>
        roomMessagesSelector(state, {roomId: selectedRoom})
    );


    useEffect(() => {
        loadRooms();
        loadMessages();
        loadUsers();
        connect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedRoom !== null) {
            const room = rooms.find(room => room.id === selectedRoom);
            const members = room.members.filter(member => member !== currentUser.data.id);
            const user = users.find(user => user.id === members[0]);

            const avatar = members.length === 1 && user ? user.email.charAt(0) : null;
            const username = members.length === 1 && user ? user.email : '';

            setHeaderAvatar(avatar);
            setHeaderUsername(username);
        }
    }, [selectedRoom, currentUser, rooms, users])

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
        sendMessage(selectedRoom, message)
        setMessage('')
    }

    const handleSearchUsersClick = (userId) => {
        const room = rooms.find(room => room.members.includes(userId))

        if (room)
            setSelectedRoom(userId);
        else
            createRoom(userId, setSelectedRoom)

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
                            selectedRoom={selectedRoom}
                            searchUsers={searchUsers}
                            handleSearchUsersClick={handleSearchUsersClick}
                            rooms={rooms}
                            setSelectedRoom={setSelectedRoom}
                        />
                        {selectedRoom != null &&
                            <div>
                                <Header avatar={headerAvatar} username={headerUsername}/>
                                <MessagesList roomMessages={selectedRoomMessages} currentUser={currentUser}/>
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
    addNewMessage: addNewMessage,
    getUser: getUser,
};

export default connect(null, mapDispatchToProps)(ChatRoom);
