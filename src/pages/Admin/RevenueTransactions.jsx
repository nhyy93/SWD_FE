import React, { useState } from 'react';
import "./Admin.css";

const RevenueTransactions = () => {
    // Sample transaction data
    const [transactions] = useState([
        { id: 1, cyclist: 'Cyclist A', shop: 'Shop Owner B', amount: "$50", status: 'Completed' },
        { id: 2, cyclist: 'Cyclist C', shop: 'Shop Owner D', amount: "$75", status: 'Refunded' },
        { id: 3, cyclist: 'Cyclist E', shop: 'Shop Owner F', amount: "$30", status: 'Pending' },
    ]);

    return (
        <div>
            <h1>Revenue & Transactions</h1>
            <p>Oversee financial transactions and resolve disputes.</p>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cyclist</th>
                        <th>Shop Owner</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id}>
                            <td>{tx.id}</td>
                            <td>{tx.cyclist}</td>
                            <td>{tx.shop}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RevenueTransactions;
