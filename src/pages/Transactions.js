import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TransactionsContainer = styled.div`
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const BalanceSection = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${(props) => (props.balance > 0 ? '#27ae60' : '#e74c3c')};
`;

const SpendingSection = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #e74c3c;
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
  color: ${(props) => (props.type === 'credit' ? '#27ae60' : '#e74c3c')};
  font-weight: bold;
`;

const InputSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${(props) => (props.disabled ? '#ccc' : '#4a90e2')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'credit', amount: 1000, description: 'Salary', date: '2025-02-15' }
  ]);
  const [balance, setBalance] = useState(1000);
  const [totalSpent, setTotalSpent] = useState(0);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [addMoneyAmount, setAddMoneyAmount] = useState('');

  useEffect(() => {
    const spent = transactions
      .filter(transaction => transaction.type === 'debit')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalSpent(spent);
  }, [transactions]);

  const handleTransaction = () => {
    if (!amount || !category) return;
    if (balance <= 0) return alert('Money is not available! Add money first.');
    if (parseFloat(amount) > balance) return alert('Insufficient balance! Add more money.');

    const newTransaction = {
      id: transactions.length + 1,
      type: 'debit',
      amount: parseFloat(amount),
      description: category,
      date: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };

    setTransactions([...transactions, newTransaction]);
    setBalance(prevBalance => prevBalance - newTransaction.amount);
    setAmount('');
    setCategory('');
  };

  const handleAddMoney = () => {
    if (!addMoneyAmount || parseFloat(addMoneyAmount) <= 0) {
      alert('Please enter a valid amount to add.');
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      type: 'credit',
      amount: parseFloat(addMoneyAmount),
      description: 'Deposit',
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([...transactions, newTransaction]);
    setBalance(prevBalance => prevBalance + newTransaction.amount);
    setAddMoneyAmount('');
  };

  return (
    <TransactionsContainer>
      <h1>Transaction Overview</h1>

      <Card>
        <BalanceSection balance={balance}>
          {balance > 0 ? (
            <>Available Balance: ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</>
          ) : (
            <>💸 Money is not available. Please add money! </>
          )}
        </BalanceSection>

        <SpendingSection>
          Total Spent: <span>${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </SpendingSection>
      </Card>

      {/* Add Money Section */}
      <Card>
        <h2>Add Money to Account</h2>
        <InputSection>
          <Input
            type="number"
            placeholder="Enter amount to add"
            value={addMoneyAmount}
            onChange={(e) => setAddMoneyAmount(e.target.value)}
          />
          <Button onClick={handleAddMoney}>Add Money</Button>
        </InputSection>
      </Card>

      {/* Spend Money Section */}
      <Card>
        <h2>New Transaction</h2>
        <InputSection>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={balance <= 0}
          />
          <Select value={category} onChange={(e) => setCategory(e.target.value)} disabled={balance <= 0}>
            <option value="">Select Category</option>
            <option value="Grocery Shopping">Grocery Shopping</option>
            <option value="Mobile Recharge">Mobile Recharge</option>
            <option value="Electricity Bill">Electricity Bill</option>
            <option value="Online Shopping">Online Shopping</option>
            <option value="Dining">Dining</option>
          </Select>
          <Button onClick={handleTransaction} disabled={balance <= 0}>Spend</Button>
        </InputSection>
      </Card>

      {/* Transaction History */}
      <Card>
        <h2>Transaction History</h2>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id}>
            <div>
              <div>{transaction.description}</div>
              <small>{new Date(transaction.date).toLocaleDateString()}</small>
              {transaction.updatedDate && (
                <small style={{ display: 'block', color: 'gray' }}>Updated: {new Date(transaction.updatedDate).toLocaleDateString()}</small>
              )}
            </div>
            <Amount type={transaction.type}>
              {transaction.type === 'credit' ? '+' : '-'}
              ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Amount>
          </Transaction>
        ))}
      </Card>
    </TransactionsContainer>
  );
};

export default Transactions;
