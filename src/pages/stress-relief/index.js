import React, { useState } from 'react';
import styled from 'styled-components';

const songs = [
    { title: 'Happy Vibes', mentalState: 'happy' },
    { title: 'Calm and Peaceful', mentalState: 'calm' },
    { title: 'Focus Beats', mentalState: 'focused' },
    { title: 'Energizing Tracks', mentalState: 'energetic' },
    { title: 'Relaxing Tunes', mentalState: 'relaxed' },
    { title: 'Motivational Hits', mentalState: 'motivated' },
    { title: 'Melancholic Melodies', mentalState: 'sad' },
    { title: 'Chillout Sounds', mentalState: 'chill' }
];

const ChatPage = () => {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user input to the chat
        setChat([...chat, { sender: 'user', message: input }]);

        // Find songs matching the mental state
        const songRecommendations = songs.filter(song =>
            song.mentalState.toLowerCase() === input.toLowerCase()
        );

        if (songRecommendations.length > 0) {
            setChat([...chat, { sender: 'user', message: input }, { sender: 'bot', message: `Recommended songs for ${input}:` }]);
            setRecommendations(songRecommendations);
        } else {
            setChat([...chat, { sender: 'user', message: input }, { sender: 'bot', message: `No songs found for the mental state "${input}". Try another one!` }]);
        }

        // Clear the input
        setInput('');
    };

    return (
        <ChatContainer>
            <ChatWindow>
                {chat.map((msg, index) => (
                    <Message key={index} sender={msg.sender}>
                        {msg.sender === 'bot' ? <BotLabel>Bot:</BotLabel> : <UserLabel>You:</UserLabel>} {msg.message}
                    </Message>
                ))}

                {recommendations.length > 0 && (
                    <RecommendationList>
                        {recommendations.map((song, index) => (
                            <Song key={index}>{song.title}</Song>
                        ))}
                    </RecommendationList>
                )}
            </ChatWindow>

            <Footer>
                <ChatInput
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="How are you feeling?"
                />
                <SendButton onClick={handleSend}>Send</SendButton>
            </Footer>
        </ChatContainer>
    );
};

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
`;

const ChatWindow = styled.div`
    padding: 20px;
    overflow-y: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const Message = styled.div`
    margin: 10px 0;
    padding: 10px;
    background-color: ${(props) => (props.sender === 'user' ? '#D1FFD6' : '#F1F1F1')};
    align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
    border-radius: 10px;
    max-width: 60%;
`;

const BotLabel = styled.span`
    font-weight: bold;
    color: #555;
`;

const UserLabel = styled.span`
    font-weight: bold;
    color: #555;
`;

const RecommendationList = styled.div`
    margin-top: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 10px;
`;

const Song = styled.div`
    margin: 5px 0;
    padding: 5px;
    background-color: #e0e0e0;
    border-radius: 5px;
`;

const Footer = styled.div`
    display: flex;
    padding: 10px;
    background-color: #f1f1f1;
`;

const ChatInput = styled.input`
    flex-grow: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
`;

const SendButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

export default ChatPage;
