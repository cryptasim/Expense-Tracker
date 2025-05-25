import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Expense Tracker App</h1>
      <p>Track your expenses easily and stay on top of your finances.</p>
      <Link to="/register" className="btn">Get Started</Link>
    </div>
  );
};

export default Home;
