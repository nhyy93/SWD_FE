import React, { useState } from 'react';
import "./Admin.css";

const UserManagement = () => {
    // Sample data for users/shops
    const [users, setUsers] = useState([
        { id: 1, name: 'Cyclist A', role: 'Cyclist', verified: false },
        { id: 2, name: 'Shop Owner B', role: 'Shop Owner', verified: true },
        { id: 3, name: 'Cyclist C', role: 'Cyclist', verified: true },
        { id: 4, name: 'Shop Owner D', role: 'Shop Owner', verified: false },
    ]);

    const handleVerify = (id) => {
        setUsers(users.map(user => user.id === id ? { ...user, verified: true } : user));
    };

    const handleSuspend = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div>
            <h1>User & Shop Management</h1>
            <p>Manage user profiles and shop authenticity.</p>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Verified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.verified ? 'Yes' : 'No'}</td>
                            <td>
                                {!user.verified && <button onClick={() => handleVerify(user.id)}>Verify</button>}
                                <button onClick={() => handleSuspend(user.id)}>Suspend</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
