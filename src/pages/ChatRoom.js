import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewMessage, loadChats } from '../state/chats/actions';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { currentUserConnected, currentUserJoined } from '../state/users/actions';

var stompClient = null;

function ChatRoom({ loadChats, currentUserConnected, currentUserJoined, addNewMessage }) {
    const [tab, setTab] = useState(null);
    const [message, setMessage] = useState(null)

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
        }
    };

    return (
        <div className="container">
            { chatsAsync.isLoading ? (
                <div>
                    Loading
                </div>
            ) : (
                currentUser.socketData.connected && (
                        <div className="chat-box">
                            <div className="member-list">
                                <ul>
                                    {chats.map(chat => chat.companion).map((id, index) => (
                                        <li onClick={() => {
                                            setTab(id);
                                        }} className={`member ${tab === id && 'active'}`} key={index}>{id}</li>
                                    ))}
                                </ul>
                            </div>
                            {tab != null && <div className="chat-content">
                                <ul className="chat-messages">
                                    {chats.find(chat => chat.companion === tab).messages.map((message, index) => (
                                        <li className={`message ${message.sender === currentUser.data.id && 'self'}`} key={index}>
                                            {message.sender !== currentUser.data.id && <div className="avatar">{message.sender}</div>}
                                            <div className="message-data">{message.message}</div>
                                            {message.sender === currentUser.data.id && <div className="avatar self">{message.sender}</div>}
                                        </li>
                                    ))}
                                </ul>

                                <div className="send-message">
                                    <input type="text" className="input-message" placeholder="enter the message" value={message} onChange={handleMessage} />
                                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                                </div>
                            </div>}
                        </div>)
            )
            }
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
