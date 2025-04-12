import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

    // Mock conversation data, can be deleted later with backend complete
    const [conversations] = useState<Conversation[]>([
        {
            id: 1,
            participant: "Alice",
            lastMessage: "Looking forward to hearing back soon!",
            timestamp: "2025-04-07 12:45 PM",
            isNew: true, 
        },
        {
            id: 2,
            participant: "Bob",
            lastMessage: "Thanks for the update!",
            timestamp: "2025-04-06 16:10 PM",
            isNew: false, 
        },
        {
            id: 3,
            participant: "Charlie",
            lastMessage: "Can we reschedule our meeting?",
            timestamp: "2025-04-05 09:30 AM",
            isNew: false,
        },
    ]);

    // Handler for submitting the new DM form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setSuccess(false);
        setError('');

        try {
            // Simulate an API call to send a DM
            setTimeout(() => {
                setSending(false);
                setSuccess(true);
                // Clear fields
                setRecipient('');
                setSubject('');
                setMessage('');
            }, 1000);
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
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter message subject (optional)"
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
                        <Link
                            key={conv.id}
                            to={`/conversations/${conv.id}`}
                            className={`conversation-item ${conv.isNew ? 'new-message' : ''}`}
                        >
                            <div className="conversation-header">
                                <span className="participant">{conv.participant}</span>
                                <span className="timestamp">{conv.timestamp}</span>
                            </div>
                            <div className="last-message">{conv.lastMessage}</div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DMPage;
