import React, { useState } from 'react';

function AIAdvisor({ connectedAccount }) {
  const [investmentGoal, setInvestmentGoal] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentHorizon, setInvestmentHorizon] = useState('medium');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!connectedAccount) {
      alert("Please connect your wallet first");
      return;
    }
    
    setLoading(true);
    
    // This would typically call an AI service API
    // Simulating API call with timeout
    setTimeout(() => {
      // Generate a recommendation based on inputs
      const mockRecommendation = generateRecommendation(
        investmentGoal, 
        riskTolerance, 
        investmentAmount, 
        investmentHorizon
      );
      
      setRecommendation(mockRecommendation);
      setLoading(false);
    }, 2000);
  };
  
  const generateRecommendation = (goal, risk, amount, horizon) => {
    // Simple logic to generate recommendations based on inputs
    let recommendedBaskets = [];
    let insights = [];
    
    // Add baskets based on risk tolerance
    if (risk === 'low') {
      recommendedBaskets.push({
        id: 'basket-2',
        name: 'East Africa Infrastructure',
        allocation: 60,
        rationale: 'Stable returns with lower volatility'
      });
      recommendedBaskets.push({
        id: 'basket-1',
        name: 'Kenya Tech Growth',
        allocation: 40,
        rationale: 'Moderate growth potential'
      });
      insights.push('Your low risk tolerance suggests a conservative portfolio focusing on established companies.');
    } else if (risk === 'moderate') {
      recommendedBaskets.push({
        id: 'basket-1',
        name: 'Kenya Tech Growth',
        allocation: 60,
        rationale: 'Balanced growth with manageable risk'
      });
      recommendedBaskets.push({
        id: 'basket-3',
        name: 'African Innovation Fund',
        allocation: 40,
        rationale: 'Higher growth potential to boost returns'
      });
      insights.push('A balanced approach with both established companies and growth opportunities suits your risk profile.');
    } else {
      recommendedBaskets.push({
        id: 'basket-3',
        name: 'African Innovation Fund',
        allocation: 70,
        rationale: 'High growth potential aligned with risk tolerance'
      });
      recommendedBaskets.push({
        id: 'basket-1',
        name: 'Kenya Tech Growth',
        allocation: 30,
        rationale: 'Some stability to mitigate overall portfolio risk'
      });
      insights.push('Your high risk tolerance allows for focusing on emerging high-growth opportunities across Africa.');
    }
    
    // Add insights based on goal and horizon
    if (goal.toLowerCase().includes('retirement')) {
      insights.push(`With retirement as your goal, a ${horizon} time horizon suggests ${risk === 'high' ? 'an aggressive approach now with gradual rebalancing as you approach retirement' : 'a steady approach with consistent contributions'}.`);
    } else if (goal.toLowerCase().includes('education')) {
      insights.push(`For education funding with a ${horizon} time horizon, ${risk === 'low' ? 'capital preservation becomes increasingly important as the education start date approaches' : 'consider a more aggressive approach now with rebalancing to lower risk as the education start date approaches'}.`);
    } else {
      insights.push(`For your general investment goals with a ${horizon} time horizon, this portfolio aims to ${risk === 'high' ? 'maximize growth potential' : risk === 'moderate' ? 'balance growth with stability' : 'prioritize capital preservation with modest growth'}.`);
    }
    
    // Add insight based on amount
    const amountNum = parseFloat(amount);
    if (amountNum < 500) {
      insights.push('With your investment amount, consider dollar-cost averaging to build positions over time.');
    } else if (amountNum >= 5000) {
      insights.push('Your investment amount allows for proper diversification across multiple baskets.');
    }
    
    return {
      baskets: recommendedBaskets,
      insights: insights,
      expectedReturn: risk === 'low' ? '8-10%' : risk === 'moderate' ? '12-15%' : '18-22%',
      riskAssessment: risk === 'low' ? 'Conservative' : risk === 'moderate' ? 'Balanced' : 'Aggressive'
    };
  };
  
  return (
    <div className="ai-advisor">
      <h2>AI Investment Advisor</h2>
      <p className="advisor-intro">
        Our AI advisor analyzes your investment goals, risk tolerance, and timeline 
        to provide personalized investment recommendations.
      </p>
      
      <div className="advisor-container">
        <div className="advisor-form-container">
          <form className="advisor-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="investmentGoal">What is your primary investment goal?</label>
              <input
                type="text"
                id="investmentGoal"
                placeholder="e.g., Retirement, Education, Wealth Building"
                value={investmentGoal}
                onChange={(e) => setInvestmentGoal(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="riskTolerance">What is your risk tolerance?</label>
              <select
                id="riskTolerance"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(e.target.value)}
                required
              >
                <option value="low">Low - Prioritize capital preservation</option>
                <option value="moderate">Moderate - Balance growth with stability</option>
                <option value="high">High - Maximize growth potential</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="investmentAmount">How much do you want to invest (in USD)?</label>
              <input
                type="number"
                id="investmentAmount"
                placeholder="e.g., 1000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                min="100"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="investmentHorizon">What is your investment time horizon?</label>
              <select
                id="investmentHorizon"
                value={investmentHorizon}
                onChange={(e) => setInvestmentHorizon(e.target.value)}
                required
              >
                <option value="short">Short-term (1-3 years)</option>
                <option value="medium">Medium-term (3-7 years)</option>
                <option value="long">Long-term (7+ years)</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="generate-advice-btn"
              disabled={loading || !connectedAccount}
            >
              {loading ? 'Generating Advice...' : 'Get Personalized Advice'}
            </button>
          </form>
        </div>
        
        {recommendation && (
          <div className="recommendation-container">
            <h3>Your Personalized Investment Plan</h3>
            
            <div className="recommendation-summary">
              <div className="summary-item">
                <span className="summary-label">Expected Annual Return:</span>
                <span className="summary-value">{recommendation.expectedReturn}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Risk Profile:</span>
                <span className="summary-value">{recommendation.riskAssessment}</span>
              </div>
            </div>
            
            <div className="recommended-baskets">
              <h4>Recommended Investment Baskets</h4>
              <div className="basket-allocation">
                {recommendation.baskets.map(basket => (
                  <div key={basket.id} className="allocation-item">
                    <div className="allocation-header">
                      <h5>{basket.name}</h5>
                      <span className="allocation-percentage">{basket.allocation}%</span>
                    </div>
                    <div className="allocation-bar">
                      <div 
                        className="allocation-fill"
                        style={{ width: `${basket.allocation}%` }}
                      ></div>
                    </div>
                    <p className="allocation-rationale">{basket.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="ai-insights">
              <h4>AI Insights</h4>
              <ul className="insights-list">
                {recommendation.insights.map((insight, index) => (
                  <li key={index} className="insight-item">{insight}</li>
                ))}
              </ul>
            </div>
            
            <div className="recommendation-actions">
              <button className="action-btn primary">Invest According to Plan</button>
              <button className="action-btn secondary">Customize Plan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIAdvisor;
