import React, { useState, useEffect } from 'react';
import { Client, AccountId, PrivateKey } from '@hashgraph/sdk';
import { HashConnect } from 'hashconnect';
import Navbar from './components/Navbar';
import InvestmentBaskets from './components/InvestmentBaskets';
import AIAdvisor from './components/AIAdvisor';
import Portfolio from './components/Portfolio';
import './App.css';

function App() {
  const [client, setClient] = useState(null);
  const [hashconnect, setHashconnect] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [activeTab, setActiveTab] = useState('baskets');
  
  // Initialize Hedera client
  useEffect(() => {
    const initClient = async () => {
      // Use the account ID and private key from your instructions
      const accountId = AccountId.fromString("0.0.5782340");
      const privateKey = PrivateKey.fromString("302e020100300506032b6570042204206d1bff0fdf2");
      
      // Create a client for the Hedera testnet
      const hederaClient = Client.forTestnet();
      hederaClient.setOperator(accountId, privateKey);
      
      setClient(hederaClient);
      
      // Initialize HashConnect
      const hashconnectInstance = new HashConnect();
      const appMetadata = {
        name: "SI-unit.KE dApp",
        description: "EAKM Tokenized Investment Platform",
        icon: "https://www.example.com/icon.png" // Replace with actual icon URL
      };
      
      const initData = await hashconnectInstance.init(appMetadata, "testnet");
      setHashconnect(hashconnectInstance);
    };
    
    initClient();
  }, []);
  
  // Connect wallet function
  const connectWallet = async () => {
    if (!hashconnect) return;
    
    try {
      // Generate a pairing string
      const state = await hashconnect.connect();
      console.log("Pairing string:", state.pairingString);
      
      // Open hashpack extension with the pairing string
      const topic = await hashconnect.pair(state.pairingString);
      
      // Listen for connection events
      hashconnect.connectionStatusChange.on((state) => {
        if (state.status === "connected") {
          setConnectedAccount(state.accountIds[0]);
        }
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };
  
  return (
    <div className="app-container">
      <Navbar 
        connectWallet={connectWallet} 
        connectedAccount={connectedAccount}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      
      <div className="content-container">
        {activeTab === 'baskets' && <InvestmentBaskets client={client} connectedAccount={connectedAccount} />}
        {activeTab === 'advisor' && <AIAdvisor connectedAccount={connectedAccount} />}
        {activeTab === 'portfolio' && <Portfolio client={client} connectedAccount={connectedAccount} />}
      </div>
      
      <footer className="app-footer">
        <p>SI-unit.KE dApp - EAKM Tokenized Investment Platform</p>
        <p>Running on Hedera Testnet</p>
      </footer>
    </div>
  );
}

export default App;
