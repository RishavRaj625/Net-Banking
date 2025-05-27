import React, { useState } from 'react';
import styled from 'styled-components';

const BillsContainer = styled.div`
  padding: 20px;
`;

const BillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
`;

const BillCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #4a90e2;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #357abd;
  }
`;

const Bills = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [amount, setAmount] = useState('');

  const billTypes = [
    { type: 'Electricity', icon: '⚡' },
    { type: 'Water', icon: '💧' },
    { type: 'Internet', icon: '🌐' },
    { type: 'Phone', icon: '📱' },
    { type: 'Gas', icon: '🔥' },
    { type: 'Cable TV', icon: '📺' }
  ];

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // API call would go here
      console.log(`Paying ${amount} for ${selectedBill}`);
      alert('Payment successful!');
      setAmount('');
      setSelectedBill(null);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <BillsContainer>
      <h1>Pay Bills</h1>
      
      <BillsGrid>
        {billTypes.map((bill) => (
          <BillCard 
            key={bill.type}
            onClick={() => setSelectedBill(bill.type)}
            style={{
              border: selectedBill === bill.type ? '2px solid #4a90e2' : 'none'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{bill.icon}</div>
            <h3>{bill.type}</h3>
          </BillCard>
        ))}
      </BillsGrid>

      {selectedBill && (
        <BillCard>
          <h2>Pay {selectedBill} Bill</h2>
          <Form onSubmit={handlePayment}>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <Button type="submit">Pay Now</Button>
          </Form>
        </BillCard>
      )}
    </BillsContainer>
  );
};

export default Bills;