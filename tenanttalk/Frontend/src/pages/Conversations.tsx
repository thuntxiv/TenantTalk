import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
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
    const [conversations, setConversations] = useState(mockConversations);
    const { user, isAuthenticated, isLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Redirect if not authenticated
        if (!isLoading && !isAuthenticated) {
            navigate('/');
        }
        console.log("User:", user);
        console.log("Is Authenticated:", isAuthenticated);
        const fetchChats = async () => {
            try {
                const response = await fetch('https://tenanttalkers-ff36b9b495cc.herokuapp.com/api/chats/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setConversations(response as any);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchChats();
    }, [isLoading, isAuthenticated, navigate]);
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
