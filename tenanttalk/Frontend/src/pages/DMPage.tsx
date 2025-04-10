import React, { useState } from 'react';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import '../styles/DMPage.css';

const DMPage: React.FC = () => {
    // State for form fields and status
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Handler for submitting the form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setSuccess(false);
        setError('');

        try {
            // Replace the following with your API call to send a DM.
            // Example: await api.sendDM({ recipient, subject, message });
            setTimeout(() => {
                setSending(false);
                setSuccess(true);
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
                <h1>Send a Direct Message</h1>
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
                            placeholder="Enter message subject"
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
            </div>

            <Footer />
        </div>
    );
};

export default DMPage;
