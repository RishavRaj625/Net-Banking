import React, { useState } from 'react';
import styled from 'styled-components';
import { Send, Users, PlusCircle } from 'lucide-react';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const BalanceCard = styled.div`
  background: #f0f7ff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #357abd;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const TransactionsList = styled.div`
  margin-top: 1.5rem;
`;

const TransactionItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }
`;

const AddMoneyButton = styled.button`
  background: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #218838;
  }
`;

const TransactionDate = styled.p`
  font-size: 0.75rem;
  color: #888;
  margin: 0;
`;

const TransactionAmount = styled.p`
  font-weight: bold;
  color: #d9534f;
  margin: 0 0 0.25rem 0;
`;

const TransactionNote = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
`;

const SendMoney = ({ setIsLoading, handleError }) => {
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(5000);

  const validateTransaction = () => {
    if (!recipientName || !amount) {
      handleError({ message: 'Please enter recipient name and amount' });
      return false;
    }
    if (parseFloat(amount) <= 0) {
      handleError({ message: 'Please enter a valid amount' });
      return false;
    }
    if (parseFloat(amount) > balance) {
      handleError({ message: 'Insufficient balance' });
      return false;
    }
    return true;
  };

  const handleSendMoney = async () => {
    if (!validateTransaction()) return;

    try {
      setIsLoading(true);
      const amountNumber = parseFloat(amount);

      // Create new transaction
      const newTransaction = {
        recipientName,
        amount: amountNumber,
        note,
        date: new Date().toLocaleString()
      };

      // Update balance and transactions atomically
      setBalance(currentBalance => currentBalance - amountNumber);
      setTransactions(currentTransactions => [newTransaction, ...currentTransactions]);

      // Reset form
      setRecipientName('');
      setAmount('');
      setNote('');

      alert('Money sent successfully!');
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMoney = () => {
    const amountToAdd = prompt("Enter amount to add:");
    if (amountToAdd && !isNaN(amountToAdd) && parseFloat(amountToAdd) > 0) {
      const addAmount = parseFloat(amountToAdd);
      
      // Create new transaction for adding money
      const newTransaction = {
        recipientName: 'Account Deposit',
        amount: addAmount,
        note: 'Added funds to wallet',
        date: new Date().toLocaleString(),
        type: 'credit'
      };

      // Update balance and transactions
      setBalance(currentBalance => currentBalance + addAmount);
      setTransactions(currentTransactions => [newTransaction, ...currentTransactions]);
      
      alert("Money added successfully!");
    } else {
      alert("Invalid amount entered!");
    }
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
        </CardHeader>
        <CardContent>
          <BalanceCard>
            <div>
              <Label>Available Balance</Label>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4a90e2' }}>
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <AddMoneyButton onClick={handleAddMoney}>
              <PlusCircle size={20} />
              Add Money
            </AddMoneyButton>
          </BalanceCard>

          <Label>Recipient</Label>
          <Input
            type="text"
            placeholder="Enter recipient name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />

          <Label>Amount</Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Label>Note (Optional)</Label>
          <Input
            type="text"
            placeholder="Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Button onClick={handleSendMoney}>
            <Send size={20} />
            Send Money
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <TransactionsList>
              {transactions.map((tx, index) => (
                <TransactionItem key={index}>
                  <div>
                    <strong>{tx.recipientName}</strong>
                    <TransactionNote>{tx.note || 'No note'}</TransactionNote>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <TransactionAmount style={{ 
                      color: tx.type === 'credit' ? '#28a745' : '#d9534f' 
                    }}>
                      {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </TransactionAmount>
                    <TransactionDate>{tx.date}</TransactionDate>
                  </div>
                </TransactionItem>
              ))}
            </TransactionsList>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SendMoney;