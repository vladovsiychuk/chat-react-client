import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createRoom, getRoom, loadRooms, setSelectedRoom, updateRooms} from '../state/rooms/actions';
import {currentUserConnected, getUser, loadRoomsMembers} from '../state/users/actions';
import UserListSidebar from '../components/user/UserListSidebar';
import {getAccessToken} from '../state/middleware/authMiddleware';
import {updateMessage, loadMessages, readMessage, sendMessage, loadRoomMessages} from "../state/messages/actions";
import Header from "../components/room/Header";
import MessagesList from "../components/message/MessagesList";
import MessageInput from "../components/message/MessageInput";
import WebSocketEventTypes from "../constants/WebSocketEventTypes";
import TestMessageInput from "../components/message/TestMessageInput";

function Chat({
                  loadRooms,
                  getRoom,
                  setSelectedRoom,
                  createRoom,
                  loadMessages,
                  loadRoomMessages,
                  sendMessage,
                  loadRoomsMembers,
                  currentUserConnected,
                  updateMessage,
                  updateRooms,
                  getUser,
                  readMessage,
              }) {

    const {MESSAGE_UPDATE, ROOM_UPDATE} = WebSocketEventTypes

    const [searchUsers, setSearchUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [triggerQueryUpdate, setTriggerQueryUpdate] = useState(0);

    const rooms = useSelector(state => state.rooms.rooms);
    const currentUser = useSelector(state => state.users.currentUser);
    const selectedRoom = useSelector(state => state.rooms.selectedRoomId)
    const selectedRoomRef = useRef(selectedRoom);

    const token = getAccessToken();

    useEffect(() => {
        loadRooms();
        loadMessages();
        loadRoomsMembers();
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
            console.log(`Received event: ${event.data}`);
            const receivedEvent = JSON.parse(event.data)

            if (receivedEvent.type === MESSAGE_UPDATE) {
                const message = receivedEvent.data

                updateMessage(message)
                getRoom(message.roomId)

                if (currentUser.data.id !== message.senderId)
                    getUser(message.senderId)


                if (currentUser.data.id !== message.senderId &&
                    selectedRoomRef.current === message.roomId &&
                    !message.read.includes(currentUser.data.id)
                )
                    readMessage(message.id)

            } else if (receivedEvent.type === ROOM_UPDATE) {
                const room = receivedEvent.data

                room.members
                    .filter(userId => userId !== currentUser.data.id)
                    .forEach(userId => getUser(userId))

                loadRoomMessages(room.id)

                updateRooms(room)
            } else {
            }
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
            createRoom(userId)

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
                        searchUsers={searchUsers}
                        handleSearchUsersClick={handleSearchUsersClick}
                        rooms={rooms}
                        triggerQueryUpdate={triggerQueryUpdate}
                    />
                    {selectedRoom &&
                        <div>
                            <Header/>
                            <MessagesList/>
                            <TestMessageInput/>
                        </div>
                    }
                </div>
            )}
        </div>
    );
}

Chat.propTypes = {
    loadRooms: PropTypes.func.isRequired,
    getRoom: PropTypes.func.isRequired,
    setSelectedRoom: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    loadRoomsMembers: PropTypes.func.isRequired,
    currentUserConnected: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired,
    updateRooms: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    readMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    loadRooms: loadRooms,
    getRoom: getRoom,
    setSelectedRoom: setSelectedRoom,
    createRoom: createRoom,
    loadMessages: loadMessages,
    loadRoomMessages: loadRoomMessages,
    sendMessage: sendMessage,
    loadRoomsMembers: loadRoomsMembers,
    currentUserConnected: currentUserConnected,
    updateMessage: updateMessage,
    updateRooms: updateRooms,
    getUser: getUser,
    readMessage: readMessage,
};

export default connect(null, mapDispatchToProps)(Chat);
