import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const HomeContainer = styled.div`
  padding: 20px;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Button = styled.button`
  background: #4a90e2;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #357abd;
  }
`;

const AccountBalance = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const TransactionList = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Amount = styled.span`
  color: ${props => props.type === 'credit' ? '#27ae60' : '#e74c3c'};
  font-weight: bold;
`;

const Home = () => {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    balance: 0,
    recentTransactions: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/account', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAccountData(response.data);
      } catch (error) {
        console.error('Error fetching account data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  const quickActions = [
    { title: 'Transfer Money', icon: '💸', action: () => navigate('/transfer') },
    { title: 'Pay Bills', icon: '📃', action: () => navigate('/bills') },
    { title: 'Mobile Recharge', icon: '📱', action: () => navigate('/recharge') },
    { title: 'View Statement', icon: '📊', action: () => navigate('/transactions') }
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <HomeContainer>
      <WelcomeSection>
        <h1>Welcome back, {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'User'}</h1>
        <AccountBalance>
          ${accountData.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </AccountBalance>
        <Button onClick={() => navigate('/transactions')}>View All Transactions</Button>
      </WelcomeSection>

      <GridContainer>
        {quickActions.map((action, index) => (
          <Card key={index} onClick={action.action}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{action.icon}</div>
            <h3>{action.title}</h3>
          </Card>
        ))}
      </GridContainer>

      <TransactionList>
        <h2>Recent Transactions</h2>
        {accountData.recentTransactions.slice(0, 5).map((transaction, index) => (
          <Transaction key={index}>
            <div>
              <div>{transaction.description}</div>
              <small>{new Date(transaction.date).toLocaleDateString()}</small>
            </div>
            <Amount type={transaction.type}>
              {transaction.type === 'credit' ? '+' : '-'}
              ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Amount>
          </Transaction>
        ))}
      </TransactionList>
    </HomeContainer>
  );
};

export default Home;