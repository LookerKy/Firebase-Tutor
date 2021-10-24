import React, { useEffect, useState } from 'react';
import { dbService } from 'firebaseInstance';

const Home = ({ userObj }) => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    /** 예전 방식 collection으로 부터 get을로 documents 데이터를 가져와 foreach를 통해 데이터 set**/
    /*const getMessage = async () => {
        const response = await dbService.collection('tweets').get();
        response.forEach((document) => {
            const messageObject = {
                ...document.data(),
                id: document.id,
            };
            setMessages((prev) => [messageObject, ...prev]);
            // setMessages(prev => [document.data(), ...prev])
        });
    };*/

    useEffect(() => {
        /*getMessage();*/
        dbService.collection("tweets").onSnapshot(snapshot => {
            const messageArray = snapshot.docs.map(doc =>({
                id : doc.id,
                ...doc.data()
            }))
            console.log(messageArray)
            setMessages(messageArray)
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection('tweets').add({
            message: inputMessage,
            createAt: Date.now(),
            creatorId: userObj.uid,
        });
        setInputMessage('');
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setInputMessage(value);
    };
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
