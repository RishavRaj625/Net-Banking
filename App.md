import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
// import Banking from './components/Banking';
import Transfer from './components/Transfer';
import Footer from './components/Footer';
// import Loader from './components/Loader';
import styled from 'styled-components';

const AppContainer = styled.div`
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 20px;
`;

const App = () => {
    return (
        <Router>
            <AppContainer>
                <Navbar />
                {/* <Loader /> */}
                <MainContent>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </MainContent>
                {/* <Banking /> */}
                <Transfer />
                <Footer />
            </AppContainer>
        </Router>
    );
};

export default App;