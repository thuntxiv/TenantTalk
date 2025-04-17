import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import { useAuth } from '../components/AuthContext.tsx';
import '../styles/ConversationDetail.css';

interface Message {
    _id: string;
    senderID: string;
    receiverID: string;
    message: string;
    sentAt: string;
}

const ConversationDetail: React.FC = () => {
    const conversationId = useParams().id;
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading } = useAuth();
    const currentUserId = user.id; 
    const [participantName, setParticipantName] = useState('');
    const { state } = useLocation() as any;
    const chat = state?.conv;
 
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        console.log(`User #${chat.recipientUser.username}`);
        setParticipantName(`User #${chat.recipientUser.username}`);  
        setMessages(chat.messages);
        
    }, [conversationId]);

    // Handle sending a new message
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const sendMessage = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/chats/${conversationId}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        senderID: currentUserId,
                        receiverID: chat.recipientUser.id,
                        message: newMessage
                    }),
                    });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setMessages(data.messages);
                setNewMessage("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        };
        sendMessage();
    };

    return (
        <div className="conversation-detail-page">
            <Navbar />

            {/* Main conversation container */}
            <div className="conversation-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    Back to Conversations
                </button>

                <h1>Conversation with {participantName}</h1>

                <div className="messages-container">
                    {messages.map((msg) => {
                        const msgClass = (msg.senderID === currentUserId) ? "sent" : "received";
                        return (
                            <div key={msg._id} className={`message ${msgClass}`}>
                                <div className="message-content">{msg.message}</div>
                                <div className="message-timestamp">{msg.sentAt}</div>
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
            <Footer />
        </div>
    );
};

export default ConversationDetail;
