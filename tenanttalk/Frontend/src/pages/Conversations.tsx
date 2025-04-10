import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Conversations.css';

// Example mock data 
const mockConversations = [
    {
        id: 1,
        participant: "Alice Johnson",
        lastMessage: "Looking forward to hearing back soon!",
        timestamp: "2025-04-07 12:45",
    },
    {
        id: 2,
        participant: "Bob Smith",
        lastMessage: "Thanks for the update!",
        timestamp: "2025-04-06 16:10",
    },
    {
        id: 3,
        participant: "Charlie Brown",
        lastMessage: "Can we reschedule our meeting?",
        timestamp: "2025-04-05 09:30",
    }
];

const Conversations: React.FC = () => {
    return (
        <div className="conversations-page">
            <h1>Your Conversations</h1>
            <div className="conversation-list">
                {mockConversations.map((conversation) => (
                    <Link
                        key={conversation.id}
                        to={`/conversations/${conversation.id}`}
                        className="conversation-item"
                    >
                        <div className="conversation-header">
                            <span className="participant">{conversation.participant}</span>
                            <span className="timestamp">{conversation.timestamp}</span>
                        </div>
                        <div className="last-message">
                            {conversation.lastMessage}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Conversations;
