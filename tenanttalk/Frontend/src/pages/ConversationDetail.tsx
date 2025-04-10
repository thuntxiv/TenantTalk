import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import '../styles/ConversationDetail.css';

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

// Mock message data
const mockConversations: { [key: number]: Message[] } = {
    1: [
        { id: 1, sender: "You", content: "Hi Alice, how are you?", timestamp: "2025-04-07 12:00" },
        { id: 2, sender: "Alice", content: "I'm good! How about you?", timestamp: "2025-04-07 12:05" },
        { id: 3, sender: "You", content: "Doing well, thanks!", timestamp: "2025-04-07 12:10" }
    ],
    2: [
        { id: 1, sender: "You", content: "Hi Bob, did you get my email?", timestamp: "2025-04-06 15:00" },
        { id: 2, sender: "Bob", content: "Yes, thanks for the update!", timestamp: "2025-04-06 16:10" }
    ],
    3: [
        { id: 1, sender: "Charlie", content: "Can we reschedule our meeting?", timestamp: "2025-04-05 09:30" },
        { id: 2, sender: "You", content: "Sure, what time works best for you?", timestamp: "2025-04-05 09:45" }
    ]
};

// Simple mapping of conversation ID to participant’s name
const conversationInfo: { [key: number]: string } = {
    1: "Alice",
    2: "Bob",
    3: "Charlie"
};

const ConversationDetail: React.FC = () => {
    const { id } = useParams();
    const conversationId = Number(id);
    const navigate = useNavigate();

    // Participant name or fallback
    const participantName = conversationInfo[conversationId] || `User #${conversationId}`;

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    // Load mock conversation messages on mount
    useEffect(() => {
        const loadedMessages = mockConversations[conversationId] || [];
        setMessages(loadedMessages);
    }, [conversationId]);

    // Handle sending a new message
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const nextId = messages.length + 1;
        const newMsg: Message = {
            id: nextId,
            sender: "You",
            content: newMessage,
            timestamp: new Date().toLocaleString(),
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    return (
        <div className="conversation-detail-page">
            {/* Full-width header */}
            <Navbar />

            {/* Main conversation container */}
            <div className="conversation-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    Back to Conversations
                </button>

                <h1>Conversation with {participantName}</h1>

                <div className="messages-container">
                    {messages.map((msg) => {
                        const msgClass = (msg.sender === "You") ? "sent" : "received";
                        return (
                            <div key={msg.id} className={`message ${msgClass}`}>
                                <div className="message-content">{msg.content}</div>
                                <div className="message-timestamp">{msg.timestamp}</div>
                            </div>
                        );
                    })}
                </div>

                <form className="message-form" onSubmit={handleSend}>
                    <textarea
                        className="message-input"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        required
                    />
                    <button type="submit">Send</button>
                </form>
            </div>

            {/* Full-width footer */}
            <Footer />
        </div>
    );
};

export default ConversationDetail;
