// pages/index.tsx
import React from 'react';
import Dashboard from './dashboard';

const HomePage = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <Dashboard />
            {/* <h1>Welcome to EventDash!</h1>
            <p>This is your homepage (index.tsx)</p> */}
        </div>
    );
};

export default HomePage;
