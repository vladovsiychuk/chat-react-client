import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createRoom, getRoom, loadRooms} from '../state/rooms/actions';
import {currentUserConnected, getUser, loadUsers} from '../state/users/actions';
import UserListSidebar from '../components/user/UserListSidebar';
import {getAccessToken} from '../state/middleware/authMiddleware';
import {addNewMessage, loadMessages, readMessage, sendMessage} from "../state/messages/actions";
import {roomMessagesSelector} from "../state/messages/selectors";
import Header from "../components/room/Header";
import MessagesList from "../components/message/MessagesList";
import MessageInput from "../components/message/MessageInput";


function ChatRoom({
                      loadRooms,
                      getRoom,
                      createRoom,
                      loadMessages,
                      sendMessage,
                      loadUsers,
                      currentUserConnected,
                      addNewMessage,
                      getUser,
                      readMessage,
                  }) {

    const [selectedRoom, setSelectedRoom] = useState(null);
    const selectedRoomRef = useRef(selectedRoom);
    const [searchUsers, setSearchUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [triggerQueryUpdate, setTriggerQueryUpdate] = useState(0);

    const rooms = useSelector(state => state.rooms.rooms);
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
        selectedRoomRef.current = selectedRoom; // Update the ref when the state changes
    }, [selectedRoom]);

    const connect = () => {
        const ws = new WebSocket(`ws://localhost:8082/ws/chat/${currentUser.data.id}?access_token=${token}`);

        ws.onopen = () => {
            currentUserConnected(true);
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            console.log(`Received message: ${event.data}`);
            const receivedMessage = JSON.parse(event.data)

            addNewMessage(receivedMessage)
            getRoom(receivedMessage.roomId)
            getUser(receivedMessage.senderId)


            if (currentUser.data.id !== receivedMessage.senderId &&
                selectedRoomRef.current === receivedMessage.roomId &&
                !receivedMessage.read.includes(currentUser.data.id)
            )
                readMessage(JSON.parse(event.data).id)
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

        if (room) {
            setSelectedRoom(room.id);
            setTriggerQueryUpdate(prevTrigger => prevTrigger + 1);
        } else
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
            {currentUser.socketData.connected && (
                <div>
                    <UserListSidebar
                        setSearchUsers={setSearchUsers}
                        selectedRoom={selectedRoom}
                        searchUsers={searchUsers}
                        handleSearchUsersClick={handleSearchUsersClick}
                        rooms={rooms}
                        setSelectedRoom={setSelectedRoom}
                        triggerQueryUpdate={triggerQueryUpdate}
                    />
                    {selectedRoom != null &&
                        <div>
                            <Header selectedRoomId={selectedRoom}/>
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
            )}
        </div>
    );
}

ChatRoom.propTypes = {
    loadRooms: PropTypes.func.isRequired,
    getRoom: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired,
    currentUserConnected: PropTypes.func.isRequired,
    addNewMessage: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    readMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    loadRooms: loadRooms,
    getRoom: getRoom,
    createRoom: createRoom,
    loadMessages: loadMessages,
    sendMessage: sendMessage,
    loadUsers: loadUsers,
    currentUserConnected: currentUserConnected,
    addNewMessage: addNewMessage,
    getUser: getUser,
    readMessage: readMessage,
};

export default connect(null, mapDispatchToProps)(ChatRoom);
