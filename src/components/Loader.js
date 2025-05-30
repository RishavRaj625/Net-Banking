// src/components/Loader.js
import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Loader = () => {
    return (
        <LoaderContainer>
            <div className="loader"></div>
            <style>
                {`
                    .loader {
                        border: 8px solid #f3f3f3; /* Light grey */
                        border-top: 8px solid #3498db; /* Blue */
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                        animation: spin 2s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </LoaderContainer>
    );
};

export default Loader;