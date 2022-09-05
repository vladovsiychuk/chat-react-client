import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadMessage } from '../state/message/actions';
import {getAccessToken} from '../state/middleware/authMiddleware';
import {Redirect} from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import * as messageSelectors from '../state/message/selector';

var stompClient = null;

function ChatRoom({ loadMessage, messages, async }) {
    const token = getAccessToken()

    const [tab, setTab] = useState('CHATROOM');
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });

    useEffect(() => {
        loadMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData({ ...userData, 'connected': true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    };

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: 'JOIN'
        };
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    };

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case 'JOIN':
                if (!privateChats.get(payloadData.senderName)) {
                    let users = Array.from(new Set(messages.flatMap(message => [message.senderName, message.receiverName])));
                    users
                        .forEach(user => {
                            const chatsRelatedToTheUser = messages
                                .filter(
                                    message =>
                                        (message.senderName === user || message.receiverName === user) &&
                                        (payloadData.senderName === message.senderName ||
                                            payloadData.senderName === message.receiverName)
                                )

                            if (chatsRelatedToTheUser) {
                                privateChats.set(
                                    user,
                                    messages
                                        .filter(
                                            message =>
                                                (message.senderName === user || message.receiverName === user) &&
                                                (payloadData.senderName === message.senderName ||
                                                    payloadData.senderName === message.receiverName)
                                        )
                                );
                            } else {
                                privateChats.set(
                                    user,
                                    []
                                );
                            }
                        });
                    privateChats.set(payloadData.senderName, [])
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case 'MESSAGE':
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
            default:
                return;
        }
    };

    const onPrivateMessage = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName)
                .push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const onError = (err) => {
        console.log(err);
    };

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, 'message': value });
    };
    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: 'MESSAGE'
            };
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, 'message': '' });
        }
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                date: Date.now(),
                message: userData.message,
                status: 'MESSAGE'
            };

            if (userData.username !== tab) {
                privateChats.get(tab)
                    .push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, 'message': '' });
        }
    };

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, 'username': value });
    };

    const registerUser = () => {
        connect();
    };
    return (
        <div className="container">
            {userData.connected ?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={() => {
                                setTab('CHATROOM');
                            }} className={`member ${tab === 'CHATROOM' && 'active'}`}>Chatroom
                            </li>
                            {[...privateChats.keys()].map((name, index) => (
                                name !== userData.username && (
                                    <li onClick={() => {
                                        setTab(name);
                                    }} className={`member ${tab === name && 'active'}`} key={index}>{name}</li>
                                )
                            ))}
                        </ul>
                    </div>
                    {tab === 'CHATROOM' && <div className="chat-content">
                        <ul className="chat-messages">
                            {publicChats.map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && 'self'}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendValue}>send</button>
                        </div>
                    </div>}
                    {tab !== 'CHATROOM' && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && 'self'}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        margin="normal"
                    />
                    <button type="button" onClick={registerUser}>
                        connect
                    </button>
                </div>}
        </div>
    );
};

ChatRoom.propTypes = {
    loadMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    messages: messageSelectors.getMessages(state),
    async: messageSelectors.getListAsync(state)
});

const mapDispatchToProps = {
    loadMessage: loadMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
