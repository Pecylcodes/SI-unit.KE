import React, { useState, useEffect } from 'react';

function Portfolio({ client, connectedAccount }) {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('summary');
  
  useEffect(() => {
    if (!connectedAccount) {
      setLoading(false);
      return;
    }
    
    // Simulate fetching portfolio data from blockchain
    const fetchPortfolio = async () => {
      setLoading(true);
      
      // This would typically call your backend or query the blockchain
      setTimeout(() => {
        const mockPortfolio = {
          totalValue: 5750.42,
          totalInvested: 5000,
          totalReturn: 750.42,
          returnPercentage: 15.01,
          baskets: [
            {
              id: 'basket-1',
              name: 'Kenya Tech Growth',
              invested: 2000,
              currentValue: 2340.56,
              returnAmount: 340.56,
              returnPercentage: 17.03,
              assets: [
                { name: 'Safaricom', allocation: 40, value: 936.22 },
                { name: 'Twiga Foods', allocation: 25, value: 585.14 },
                { name: 'M-KOPA', allocation: 20, value: 468.11 },
                { name: 'Sendy', allocation: 15, value: 351.09 }
              ]
            },
            {
              id: 'basket-3',
              name: 'African Innovation Fund',
              invested: 3000,
              currentValue: 3409.86,
              returnAmount: 409.86,
              returnPercentage: 13.66,
              assets: [
                { name: 'Flutterwave', allocation: 30, value: 1022.96 },
                { name: 'Andela', allocation: 25, value: 852.47 },
                { name: 'Kobo360', allocation: 25, value: 852.47 },
                { name: 'Jumia', allocation: 20, value: 681.97 }
              ]
            }
          ],
          transactions: [
            { id: 'tx1', date: '2025-03-15', type: 'Invest', amount: 2000, basket: 'Kenya Tech Growth' },
            { id: 'tx2', date: '2025-03-20', type: 'Invest', amount: 3000, basket: 'African Innovation Fund' }
          ]
        };
        
        setPortfolio(mockPortfolio);
        setLoading(false);
      }, 1500);
    };
    
    fetchPortfolio();
  }, [connectedAccount]);
  
  const withdrawFromBasket = async (basketId, amount) => {
    if (!connectedAccount || !client) {
      alert("Please connect your wallet");
      return;
    }
    
    // This would call a smart contract function
    console.log(`Withdrawing ${amount} from basket ${basketId}`);
    
    // Simulate success for now
    alert(`Successfully initiated withdrawal from ${basketId}`);
  };
  
  if (!connectedAccount) {
    return (
      <div className="portfolio-container">
        <h2>My Portfolio</h2>
        <div className="connect-prompt">
          <p>Please connect your wallet to view your portfolio</p>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="portfolio-container">
        <h2>My Portfolio</h2>
        <div className="loading">Loading your portfolio data...</div>
      </div>
    );
  }
  
  if (!portfolio) {
    return (
      <div className="portfolio-container">
        <h2>My Portfolio</h2>
        <div className="empty-portfolio">
          <p>You don't have any investments yet</p>
          <button className="action-btn">Explore Investment Baskets</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="portfolio-container">
      <h2>My Portfolio</h2>
      
      <div className="portfolio-summary">
        <div className="summary-card total-value">
          <h3>Total Value</h3>
          <p className="value">${portfolio.totalValue.toFixed(2)}</p>
        </div>
        
        <div className="summary-card return">
          <h3>Total Return</h3>
          <p className="value ${portfolio.totalReturn >= 0 ? 'positive' : 'negative'}">
            ${portfolio.totalReturn.toFixed(2)} ({portfolio.returnPercentage.toFixed(2)}%)
          </p>
        </div>
        
        <div className="summary-card invested">
          <h3>Total Invested</h3>
          <p className="value">${portfolio.totalInvested.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="portfolio-tabs">
        <button 
          className={`tab ${activeView === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveView('summary')}
        >
          Summary
        </button>
        <button 
          className={`tab ${activeView === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveView('transactions')}
        >
          Transactions
        </button>
      </div>
      
      {activeView === 'summary' && (
        <div className="portfolio-holdings">
          <h3>Current Holdings</h3>
          
          <div className="holdings-list">
            {portfolio.baskets.map(basket => (
              <div key={basket.id} className="holding-card">
                <div className="holding-header">
                  <h4>{basket.name}</h4>
                  <p className={`return-badge ${basket.returnAmount >= 0 ? 'positive' : 'negative'}`}>
                    {basket.returnPercentage.toFixed(2)}%
                  </p>
                </div>
                
                <div className="holding-details">
                  <div className="detail-row">
                    <span className="detail-label">Invested:</span>
                    <span className="detail-value">${basket.invested.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Current Value:</span>
                    <span className="detail-value">${basket.currentValue.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Return:</span>
                    <span className={`detail-value ${basket.returnAmount >= 0 ? 'positive' : 'negative'}`}>
                      ${basket.returnAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="asset-allocation">
                  <h5>Asset Allocation</h5>
                  <div className="allocation-bars">
                    {basket.assets.map(asset => (
                      <div key={asset.name} className="allocation-item">
                        <div className="allocation-label">
                          <span>{asset.name}</span>
                          <span>${asset.value.toFixed(2)}</span>
                        </div>
                        <div className="allocation-bar">
                          <div 
                            className="allocation-fill"
                            style={{ width: `${asset.allocation}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="holding-actions">
                  <button 
                    className="action-btn"
                    onClick={() => withdrawFromBasket(basket.id, basket.currentValue)}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeView === 'transactions' && (
        <div className="transactions-history">
          <h3>Transaction History</h3>
          
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Basket</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.transactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td className={`tx-type ${tx.type.toLowerCase()}`}>{tx.type}</td>
                  <td>${tx.amount.toFixed(2)}</td>
                  <td>{tx.basket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
