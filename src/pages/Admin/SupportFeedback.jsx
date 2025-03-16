import React, { useState } from 'react';
import "./Admin.css";

const SupportFeedback = () => {
    const [feedbackList, setFeedbackList] = useState([
        { id: 1, user: 'Cyclist A', message: 'The app is slow.' },
        { id: 2, user: 'Shop Owner B', message: 'Issues with payment processing.' },
    ]);

    const [newFeedback, setNewFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newFeedback.trim()) {
            const newItem = {
                id: feedbackList.length + 1,
                user: 'Admin Response',
                message: newFeedback
            };
            setFeedbackList([...feedbackList, newItem]);
            setNewFeedback('');
        }
    };

    return (
        <div>
            <h1>Support & Feedback</h1>
            <div>
                <h3>Feedback & Support Tickets</h3>
                <ul>
                    {feedbackList.map(item => (
                        <li key={item.id}>
                            <strong>{item.user}:</strong> {item.message}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Send Response / Support Message</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        rows="4"
                        cols="50"
                        placeholder="Type your message here..."
                    />
                    <br />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default SupportFeedback;
