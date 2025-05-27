import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

// Page imports
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Register from './pages/Register';
import Bills from './pages/Bills';
import Recharge from './pages/Recharge';
import SendMoney from './pages/SendMoney';  // Add this import
import Chatbot from './pages/Chatbot';      // Add this import

// Component imports
import Navbar from './components/Navbar';
import Transfer from './components/Transfer';
import Footer from './components/Footer';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative; // Add this for Chatbot positioning
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #4a90e2;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Global error handler
  const handleError = (error) => {
    setError(error.message);
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  };

  return (
    <Router>
      <AppContainer>
        <Navbar />
        
        {/* Error Display */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {/* Loading Display */}
        {isLoading ? (
          <LoadingSpinner>Loading...</LoadingSpinner>
        ) : (
          <MainContent>
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    setIsLoading={setIsLoading} 
                    handleError={handleError}
                  />
                } 
              />
              <Route 
                path="/transactions" 
                element={
                  <Transactions 
                    setIsLoading={setIsLoading} 
                    handleError={handleError}
                  />
                } 
              />
              <Route 
                path="/login" 
                element={
                  <Login 
                    setIsLoading={setIsLoading} 
                    handleError={handleError}
                  />
                } 
              />
              <Route 
                path="/register" 
                element={
                  <Register 
                    setIsLoading={setIsLoading} 
                    handleError={handleError}
                  />
                } 
              />
              <Route 
                path="/bills" 
                element={
                  <Bills 
                    setIsLoading={setIsLoading} 
                    handleError={handleError}
                  />
                } 
              />
              <Route 
                path="/recharge" 
                element={
                  <Recharge 
                    setIsLoading={setIsLoading} 
                    handleError={handleError}
                  />
                } 
              />
              <Route 
                path="/transfer" 
                element={
                  <Transfer 
                    setIsLoading={setIsLoading} 
                    handleError={handleError}
                  />
                } 
              />
              {/* Add SendMoney Route */}
              <Route 
                path="/send-money" 
                element={
                  <SendMoney 
                    setIsLoading={setIsLoading} 
                    handleError={handleError}
                  />
                } 
              />
            </Routes>
          </MainContent>
        )}
        
        <Chatbot />
        
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;