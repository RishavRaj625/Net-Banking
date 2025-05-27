import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this line
import App from './App';
import './styles/App.css'; // Import global styles

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);