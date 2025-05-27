import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        minHeight: '100vh',
        // background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), linear-gradient(45deg, #1a237e, #0d47a1)',
        // background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("/api/placeholder/1920/1080")',

        background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/3943728/pexels-photo-3943728.jpeg")',

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '40px 20px'
      },
      content: {
        maxWidth: '1200px',
        margin: '0 auto'
      },
      welcomeSection: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '2rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      },
      accountBalance: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        margin: '1rem 0',
        display: 'flex',
        alignItems: 'baseline',
        color: '#4CAF50'
      },
      balanceSpan: {
        fontSize: '1rem',
        marginLeft: '0.5rem',
        opacity: '0.8'
      },
      progressBar: {
        width: '100%',
        height: '8px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        margin: '1rem 0',
        overflow: 'hidden'
      },
      progressFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #4CAF50, #81C784)',
        transition: 'width 0.3s ease'
      },
      statsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      },
      stat: {
        textAlign: 'center',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'transform 0.3s ease'
      },
      gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '2rem'
      },
      card: {
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      },
      quickActionCard: {
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      },
      button: {
        background: 'linear-gradient(45deg, #4a90e2, #357abd)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      },
      transactionItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        transition: 'background-color 0.2s ease'
      }
};

const Home = () => {
  const navigate = useNavigate(); // Add useNavigate hook

  const [userData] = useState({
    name: 'Rishu Raj',
    balance: 25430.62,
    savingsGoal: 50000,
    savingsProgress: 25430.62,
    monthlyIncome: 8500,
    monthlyExpenses: 5200,
    upcomingBills: [
      { id: 1, name: 'Electricity Bill', amount: 150, dueDate: '2025-02-20' },
      { id: 2, name: 'Internet Bill', amount: 89.99, dueDate: '2025-02-22' },
      { id: 3, name: 'Credit Card Payment', amount: 500, dueDate: '2025-02-25' }
    ],
    recentTransactions: [
      { id: 1, type: 'credit', amount: 8500, description: 'Salary Deposit', date: '2025-02-15' },
      { id: 2, type: 'debit', amount: 150, description: 'Grocery Store', date: '2025-02-14' },
      { id: 3, type: 'debit', amount: 45.99, description: 'Netflix Subscription', date: '2025-02-13' }
    ]
  });

  // Update quickActions with proper navigation
  const quickActions = [
    { title: 'Send Money', icon: '💸', action: () => navigate('/transfer') },
    { title: 'Pay Bills', icon: '📃', action: () => navigate('/bills') },
    { title: 'Mobile Recharge', icon: '📱', action: () => navigate('/recharge') },
    { title: 'ChatBot', icon: '💬', action: () => navigate('/chatbot') },
    { title: 'Investments', icon: '📈', action: () => navigate('/investments') }
  ];

  const handlePayBill = (billId) => {
    navigate(`/bills/pay/${billId}`);
  };

  const handleCardHover = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 6px 40px rgba(0, 0, 0, 0.2)';
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.welcomeSection}>
          
          <h1>Welcome back, {userData.name}</h1>
          <div style={styles.accountBalance}>
            ${userData.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            <span style={styles.balanceSpan}>Available Balance</span>
          </div>

          <h3>Savings Goal Progress</h3>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${(userData.savingsProgress / userData.savingsGoal) * 100}%`
              }}
            />
          </div>
          <p>${userData.savingsProgress.toLocaleString()} of ${userData.savingsGoal.toLocaleString()}</p>

          <div style={styles.statsContainer}>
            <div style={styles.stat}>
              <h4>Monthly Income</h4>
              <p>${userData.monthlyIncome.toLocaleString()}</p>
            </div>
            <div style={styles.stat}>
              <h4>Monthly Expenses</h4>
              <p>${userData.monthlyExpenses.toLocaleString()}</p>
            </div>
            <div style={styles.stat}>
              <h4>Savings</h4>
              <p>${(userData.monthlyIncome - userData.monthlyExpenses).toLocaleString()}</p>
            </div>
          </div>

        </div>

        {/* Quick Actions Grid */}
        <div style={styles.gridContainer}>
          {quickActions.map((action, index) => (
            <div 
              key={index}
              style={styles.quickActionCard}
              onClick={action.action} // This will now properly navigate
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{action.icon}</div>
              <h3 style={{ margin: 0 }}>{action.title}</h3>
            </div>
          ))}
        </div>

        {/* Bills and Transactions Grid */}
        <div style={styles.gridContainer}>
          {/* Upcoming Bills Card */}
          <div 
            style={styles.card}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <h2>Upcoming Bills</h2>
            {userData.upcomingBills.map(bill => (
              <div key={bill.id} style={styles.transactionItem}>
                <div>
                  <h4 style={{ margin: 0 }}>{bill.name}</h4>
                  <small>Due: {new Date(bill.dueDate).toLocaleDateString()}</small>
                </div>
                <div>
                  <strong>${bill.amount}</strong>
                  <button 
                    style={{ ...styles.button, marginLeft: '1rem', padding: '0.5rem 1rem' }}
                    onClick={() => handlePayBill(bill.id)} // Add click handler for pay button
                  >
                    Pay
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Transactions Card */}
          <div 
            style={styles.card}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <h2>Recent Transactions</h2>
            {userData.recentTransactions.map(transaction => (
              <div key={transaction.id} style={styles.transactionItem}>
                <div>
                  <h4 style={{ margin: 0 }}>{transaction.description}</h4>
                  <small>{new Date(transaction.date).toLocaleDateString()}</small>
                </div>
                <strong style={{ 
                  color: transaction.type === 'credit' ? '#27ae60' : '#e74c3c' 
                }}>
                  {transaction.type === 'credit' ? '+' : '-'}
                  ${transaction.amount}
                </strong>
              </div>
            ))}
            <button 
              style={{ ...styles.button, width: '100%', marginTop: '1rem' }}
              onClick={() => navigate('/transactions')} // Add click handler for view all button
            >
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;