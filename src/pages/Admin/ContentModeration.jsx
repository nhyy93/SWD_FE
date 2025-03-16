import React, { useState } from 'react';
import "./Admin.css";

const ContentModeration = () => {
    // Sample content submissions
    const [contents, setContents] = useState([
        { id: 1, type: 'Route', title: 'Scenic Mountain Trail', status: 'Pending' },
        { id: 2, type: 'Blog', title: 'Cycling Tips for Beginners', status: 'Pending' },
        { id: 3, type: 'Route', title: 'City Park Loop', status: 'Approved' },
    ]);

    const handleApprove = (id) => {
        setContents(contents.map(content => content.id === id ? { ...content, status: 'Approved' } : content));
    };

    const handleReject = (id) => {
        setContents(contents.map(content => content.id === id ? { ...content, status: 'Rejected' } : content));
    };

    return (
        <div>
            <h1>Content Moderation</h1>
            <p>Approve or reject public routes and blogs.</p>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contents.map(content => (
                        <tr key={content.id}>
                            <td>{content.id}</td>
                            <td>{content.type}</td>
                            <td>{content.title}</td>
                            <td>{content.status}</td>
                            <td>
                                {content.status === 'Pending' && (
                                    <>
                                        <button onClick={() => handleApprove(content.id)}>Approve</button>
                                        <button onClick={() => handleReject(content.id)}>Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContentModeration;
