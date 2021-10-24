import React, { useEffect, useState } from 'react';
import { dbService } from 'firebaseInstance';

const Home = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const getMessage = async () => {
        const response = await dbService.collection('tweets').get();
        response.forEach((document) => {
            const messageObject = {
                ...document.data(),
                id: document.id,
            };
            setMessages((prev) => [messageObject, ...prev]);
            // setMessages(prev => [document.data(), ...prev])
        });
    };
    useEffect(() => {
        getMessage();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection('tweets').add({
            message: inputMessage,
            createAt: Date.now(),
        });
        setInputMessage('');
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setInputMessage(value);
    };
    console.log(messages);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="message"
                    placeholder="new message"
                    type="text"
                    maxLength={120}
                    value={inputMessage}
                    onChange={onChange}
                />
                <input type="submit" value="post" />
            </form>
            {messages.map((message) => (
                <div key={message.id}>
                    <h4>{message.message}</h4>
                </div>
            ))}
        </div>
    );
};
export default Home;
