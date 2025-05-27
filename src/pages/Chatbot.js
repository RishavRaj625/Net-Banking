import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const ChatContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background: #4a90e2;
  color: white;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const HeaderTitle = styled.h3`
  font-weight: 600;
  margin: 0;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.isBot ? 'flex-start' : 'flex-end'};
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: ${props => props.isBot ? '#f1f5f9' : '#4a90e2'};
  color: ${props => props.isBot ? '#1e293b' : 'white'};
  white-space: pre-line;
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  outline: none;

  &:focus {
    border-color: #4a90e2;
  }
`;

const SendButton = styled.button`
  background: #4a90e2;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #357abd;
  }
`;

const BackButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #357abd;
  }
`;

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { id: prev.length + 1, text: input, isBot: false }]);
    
    // Simulate bot response based on keywords
    const userInput = input.toLowerCase();
    let botResponse = "I'm not sure about that. Can you please rephrase your question?";

    if (userInput.includes('send money')) {
      botResponse = "To send money, click on the 'Send Money' quick action on the home page or navigate to the Send Money page. You'll need the recipient's name or account ID and the amount you want to send.";
    } else if (userInput.includes('balance')) {
      botResponse = "Your current balance is displayed at the top of the home page. You can also view your detailed transaction history by clicking 'View All Transactions'.";
    } else if (userInput.includes('bill') || userInput.includes('payment')) {
      botResponse = "You can pay bills through the 'Pay Bills' quick action. We support various bill payments including utilities, mobile recharge, and credit card payments.";
    } else if (userInput.includes('help')) {
      botResponse = "I can help you with:\n- Sending money\n- Checking balance\n- Bill payments\n- Transaction history\n- Account settings\nWhat would you like to know more about?";
    }

    // Add bot response after a small delay to simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { id: prev.length + 1, text: botResponse, isBot: true }]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>
        <X size={18} />
        Back to Home
      </BackButton>

      <ChatContainer>
        <ChatHeader>
          <HeaderTitle>Chat Support</HeaderTitle>
        </ChatHeader>

        <MessagesContainer>
          {messages.map(message => (
            <MessageWrapper key={message.id} isBot={message.isBot}>
              <MessageBubble isBot={message.isBot}>
                {message.text}
              </MessageBubble>
            </MessageWrapper>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <InputWrapper>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <SendButton onClick={handleSend}>
              <Send size={20} />
            </SendButton>
          </InputWrapper>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

export default ChatbotPage;