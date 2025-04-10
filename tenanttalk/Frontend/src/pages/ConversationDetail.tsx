import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ConversationDetail.css';

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

// Mock data for demonstration – in a real app, fetch these messages from your backend
const mockConversations: { [key: number]: Message[] } = {
    1: [
        { id: 1, sender: "You", content: "Hi Alice, how are you?", timestamp: "2025-04-07 12:00" },
        { id: 2, sender: "Alice Johnson", content: "I'm good! How about you?", timestamp: "2025-04-07 12:05" },
        { id: 3, sender: "You", content: "Doing well, thanks!", timestamp: "2025-04-07 12:10" }
    ],
    2: [
        { id: 1, sender: "You", content: "Hi Bob, did you get my email?", timestamp: "2025-04-06 15:00" },
        { id: 2, sender: "Bob Smith", content: "Yes, thanks for the update!", timestamp: "2025-04-06 16:10" }
    ],
    3: [
        { id: 1, sender: "Charlie Brown", content: "Can we reschedule our meeting?", timestamp: "2025-04-05 09:30" },
        { id: 2, sender: "You", content: "Sure, what time works best for you?", timestamp: "2025-04-05 09:45" }
    ]
};

const ConversationDetail: React.FC = () => {
    const { id } = useParams();   // Conversation ID from the URL (as a string)
    const navigate = useNavigate();
    const conversationId = Number(id);

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    // Simulate fetching messages on mount (in real app, use an API call)
    useEffect(() => {
        const convMessages = mockConversations[conversationId] || [];
        setMessages(convMessages);
    }, [conversationId]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        // Create a new message object (in real app, send to backend)
        const messageToSend: Message = {
            id: messages.length + 1,
            sender: "You",
            content: newMessage,
            timestamp: new Date().toLocaleString()
        };

        setMessages([...messages, messageToSend]);
        setNewMessage("");
    };

    return (
        <div className="conversation-detail-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back to Conversations
            </button>
            <h1>Conversation with #{conversationId}</h1>
            <div className="messages-container">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender === "You" ? 'sent' : 'received'}`}>
                        <div className="message-content">{msg.content}</div>
                        <div className="message-timestamp">{msg.timestamp}</div>
                    </div>
                ))}
            </div>
            <form className="message-form" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ConversationDetail;
