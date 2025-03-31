import React from 'react';

function Navbar({ connectWallet, connectedAccount, setActiveTab, activeTab }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>SI-unit.KE</h1>
        <p>East African Knowledge Marketplace</p>
      </div>
      
      <div className="navbar-tabs">
        <button 
          className={`tab ${activeTab === 'baskets' ? 'active' : ''}`}
          onClick={() => setActiveTab('baskets')}
        >
          Investment Baskets
        </button>
        <button 
          className={`tab ${activeTab === 'advisor' ? 'active' : ''}`}
          onClick={() => setActiveTab('advisor')}
        >
          AI Advisor
        </button>
        <button 
          className={`tab ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          My Portfolio
        </button>
      </div>
      
