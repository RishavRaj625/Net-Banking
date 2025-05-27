import React, { useState } from 'react';
import styled from 'styled-components';
import { Send, Users } from 'lucide-react';

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

const SearchResults = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-top: -1rem;
  margin-bottom: 1rem;
  max-height: 200px;
  overflow-y: auto;
`;

const SearchResultItem = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

const RecipientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const RecipientCard = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
  }
`;

const SendMoney = ({ setIsLoading, handleError }) => {
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [recentRecipients] = useState([
    { id: 1, name: 'John Doe', accountId: 'john@example.com', lastSent: '2025-02-10' },
    { id: 2, name: 'Jane Smith', accountId: 'jane@example.com', lastSent: '2025-02-12' },
    { id: 3, name: 'Mike Johnson', accountId: 'mike@example.com', lastSent: '2025-02-14' }
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [balance] = useState(5000); // This should be fetched from your global state

  const handleSearch = (query) => {
    const results = recentRecipients.filter(recipient => 
      recipient.name.toLowerCase().includes(query.toLowerCase()) ||
      recipient.accountId.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleRecipientSelect = (recipient) => {
    setSelectedRecipient(recipient);
    setRecipientName(recipient.name);
    setSearchResults([]);
  };

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const transaction = {
        recipientName,
        amount: parseFloat(amount),
        note,
        date: new Date().toISOString(),
        type: 'transfer'
      };

      console.log('Processing transaction:', transaction);
      
      // Reset form
      setRecipientName('');
      setAmount('');
      setNote('');
      setSelectedRecipient(null);
      
      // Show success message
      alert('Money sent successfully!');
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
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
            <Label>Available Balance</Label>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4a90e2' }}>
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </BalanceCard>

          <div>
            <Label>Recipient</Label>
            <Input
              type="text"
              placeholder="Search by name or account ID"
              value={recipientName}
              onChange={(e) => {
                setRecipientName(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            
            {searchResults.length > 0 && (
              <SearchResults>
                {searchResults.map(recipient => (
                  <SearchResultItem
                    key={recipient.id}
                    onClick={() => handleRecipientSelect(recipient)}
                  >
                    <div style={{ fontWeight: '500' }}>{recipient.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>
                      {recipient.accountId}
                    </div>
                  </SearchResultItem>
                ))}
              </SearchResults>
            )}

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

            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} />
                Recent Recipients
              </h3>
              <RecipientsGrid>
                {recentRecipients.map(recipient => (
                  <RecipientCard
                    key={recipient.id}
                    onClick={() => handleRecipientSelect(recipient)}
                  >
                    <div style={{ fontWeight: '500' }}>{recipient.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>
                      {recipient.accountId}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.5rem' }}>
                      Last sent: {new Date(recipient.lastSent).toLocaleDateString()}
                    </div>
                  </RecipientCard>
                ))}
              </RecipientsGrid>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SendMoney;