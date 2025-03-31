import React, { useState, useEffect } from 'react';

function InvestmentBaskets({ client, connectedAccount }) {
  const [baskets, setBaskets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching baskets from a backend or smart contract
    const fetchBaskets = async () => {
      setLoading(true);
      
      // This would typically be a call to your backend or smart contract
      setTimeout(() => {
        const mockBaskets = [
          {
            id: 'basket-1',
            name: 'Kenya Tech Growth',
            description: 'A basket of top tech companies in Kenya',
            annualizedReturn: '14.2%',
            riskLevel: 'Moderate',
            minimumInvestment: 500,
            assets: [
              { name: 'Safaricom', allocation: 40 },
              { name: 'Twiga Foods', allocation: 25 },
              { name: 'M-KOPA', allocation: 20 },
              { name: 'Sendy', allocation: 15 }
            ]
          },
          {
            id: 'basket-2',
            name: 'East Africa Infrastructure',
            description: 'Infrastructure projects across East Africa',
            annualizedReturn: '9.8%',
            riskLevel: 'Low',
            minimumInvestment: 1000,
            assets: [
              { name: 'KenGen', allocation: 35 },
              { name: 'Kenya Power', allocation: 25 },
              { name: 'National Cement', allocation: 20 },
              { name: 'East African Breweries', allocation: 20 }
            ]
          },
          {
            id: 'basket-3',
            name: 'African Innovation Fund',
            description: 'High-growth startups across Africa',
            annualizedReturn: '22.5%',
            riskLevel: 'High',
            minimumInvestment: 250,
            assets: [
              { name: 'Flutterwave', allocation: 30 },
              { name: 'Andela', allocation: 25 },
              { name: 'Kobo360', allocation: 25 },
              { name: 'Jumia', allocation: 20 }
            ]
          }
        ];
        setBaskets(mockBaskets);
        setLoading(false);
      }, 1000);
    };
    
    fetchBaskets();
  }, []);
  
  const investInBasket = async (basketId, amount) => {
    if (!connectedAccount) {
      alert("Please connect your wallet first");
      return;
    }
    
    if (!client) {
      alert("Hedera client not initialized");
      return;
    }
    
    // This would call a function to interact with your smart contract
    console.log(`Investing ${amount} in basket ${basketId}`);
    
    // Simulate success for now
    alert(`Successfully invested in ${basketId}`);
  };
  
  return (
    <div className="investment-baskets">
      <h2>Investment Baskets</h2>
      
      {loading ? (
        <div className="loading">Loading investment baskets...</div>
      ) : (
        <div className="baskets-grid">
          {baskets.map(basket => (
            <div key={basket.id} className="basket-card">
              <div className="basket-header">
                <h3>{basket.name}</h3>
                <span className={`risk-badge risk-${basket.riskLevel.toLowerCase()}`}>
                  {basket.riskLevel}
                </span>
              </div>
              
              <p className="basket-description">{basket.description}</p>
              
              <div className="basket-details">
                <div className="detail-item">
                  <span className="detail-label">Annual Return:</span>
                  <span className="detail-value">{basket.annualizedReturn}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Min Investment:</span>
                  <span className="detail-value">${basket.minimumInvestment}</span>
                </div>
              </div>
              
              <div className="asset-allocation">
                <h4>Asset Allocation</h4>
                <div className="allocation-bars">
                  {basket.assets.map(asset => (
                    <div key={asset.name} className="allocation-item">
                      <div className="allocation-label">
                        <span>{asset.name}</span>
                        <span>{asset.allocation}%</span>
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
              
              <div className="basket-actions">
                <button 
                  className="invest-btn"
                  onClick={() => investInBasket(basket.id, basket.minimumInvestment)}
                  disabled={!connectedAccount}
                >
                  Invest Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InvestmentBaskets;
