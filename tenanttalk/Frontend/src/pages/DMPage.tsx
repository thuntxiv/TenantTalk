import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import '../styles/DMPage.css';

interface Conversation {
    id: number;
    participant: string;
    lastMessage: string;
    timestamp: string;
    isNew: boolean; // indicates if the last message is new/unread
}

const DMPage: React.FC = () => {
    // State for sending a new DM
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const { user, isAuthenticated, isLoading } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    
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
                const response = await fetch(`https://tenanttalkers-ff36b9b495cc.herokuapp.com/api/chats/user/${user.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log("Response:", response);
                const data = await response.json();
                console.log("Data:", data);
                setConversations(data);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            } finally {
            }
        }
        fetchChats();
    }, [isLoading, isAuthenticated, navigate]);


    // Handler for submitting the new DM form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setSuccess(false);
        setError('');
        //Verify recipient is not empty and is a valid email or username
        if (!recipient) {
            setError('Recipient cannot be empty.');
            setSending(false);
            return;
        }
        const response = await fetch('https://tenanttalkers-ff36b9b495cc.herokuapp.com/api/users/generic/${recipient}`);
        if (!response.ok) {
            setError('Recipient not found.');
            setSending(false);
            return;
        }
        const recipientData = await response.json();
        const recipientID = recipientData.userID;
        const newChat = {
            messages: [{message: message,
                senderID: user.id,
                receiverID: recipientID,
               }],
            userIDs: [user.id, recipientID],
        }
        console.log(newChat);
        //Create new DM conversation
        try {
            const createChat = await fetch(`https://tenanttalkers-ff36b9b495cc.herokuapp.com/api/chats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newChat),
                redirect: "follow"
            });
            if (!createChat.ok) {
                console.log("Error:", createChat.statusText);
                throw new Error('Network response was not ok');
            } else {
                const data = await createChat.json();
                console.log("Message sent successfully:", data);
                setSuccess(true);
                setSending(false);

                // Clear fields
                setRecipient('');
                setSubject('');
                setMessage('');

                // Add conversation to the list
                const addChat = {
                    _id: data._lid,
                    participants: recipient,
                    lastMessage: newChat.messages[0].message,
                    timestamp: new Date().toLocaleString(),
                    isNew: false,
                    recipientUser: {
                        id: recipientID,
                        username: recipientData.username || recipient,
                    },
                    createdAt: new Date().toLocaleString(),
                };
                setConversations((prevConversations) => [addChat, ...prevConversations]);
            }
        } catch (err) {
            setSending(false);
            setError('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="dm-page">
            <Navbar />

            <div className="dm-container">
                <h1>Direct Messages</h1>

                {/* NEW DM FORM at the top */}
                <form onSubmit={handleSubmit} className="dm-form">
                    <div className="form-group">
                        <label htmlFor="recipient">Recipient</label>
                        <input
                            type="text"
                            id="recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Enter recipient's username or email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here..."
                            required
                        />
                    </div>

                    <button type="submit" disabled={sending}>
                        {sending ? 'Sending...' : 'Send Message'}
                    </button>
                    {success && <p className="success-message">Message sent successfully!</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>

                <h2 className="previous-messages-title">Previous Conversations</h2>
                <div className="conversation-list">
                    {conversations.map((conv) => (
                        console.log("new:", conv),
                        <Link
                            key={conv._id}
                            to={`/conversations/${conv._id}`}
                            state={{ conv }}
                            className={`conversation-item ${conv.isNew ? 'new-message' : ''}`}
                        >
                            <div className="conversation-header">
                                <span className="participant">{conv.recipientUser.username || "New Chat"}</span>
                                <span className="timestamp">{conv.createdAt}</span>
                            </div>
                            <div className="last-message">{conv.lastmessage}</div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DMPage;
