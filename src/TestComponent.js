import React, { useEffect, useState } from 'react';

const TestComponent = () => {
    const [webSocket, setWebSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8082/ws/chat/824d060e-43f2-41bd-814e-478467c16011?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.6cD3MnZmX2xyEAWyh-GgGD11TX8SmvmHVLknuAIJ8yE');

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            console.log(`Received message: ${event.data}`);
            setReceivedMessages((prevMessages) => [...prevMessages, event.data]);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        setWebSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        if (webSocket && message) {
            webSocket.send(message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>WebSocket Component</h1>
            <ul>
                {receivedMessages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input type="text" value={message} onChange={handleMessageChange} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default TestComponent
