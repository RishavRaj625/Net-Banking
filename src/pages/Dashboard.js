import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/accounts', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAccounts(response.data);
        };

        fetchAccounts();
    }, []);

    return (
        <div>
            <h1>Your Accounts</h1>
            <ul>
                {accounts.map((account) => (
                    <li key={account._id}>
                        Account Number: {account.accountNumber} - Balance: {account.balance}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;