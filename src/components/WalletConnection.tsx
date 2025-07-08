import React from 'react';
import { Wallet, AlertCircle, Settings, ExternalLink, Info } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

export const WalletConnection: React.FC = () => {
  const { account, isConnected, isLoading, error, connectWallet, disconnectWallet } = useWeb3();
  const [showInstructions, setShowInstructions] = React.useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && account) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white font-medium">Connected: {formatAddress(account)}</span>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
      <Wallet className="w-12 h-12 text-blue-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
      <p className="text-gray-300 mb-6">
        Connect your MetaMask wallet to start using BlessingZAR
      </p>
      
      {!showInstructions ? (
        <div className="mb-6">
          <button
            onClick={() => setShowInstructions(true)}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mx-auto"
          >
            <Info className="w-4 h-4" />
            <span className="text-sm">Need help setting up Celo testnet?</span>
          </button>
        </div>
      ) : (
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-400" />
              <h4 className="text-blue-300 font-semibold">Setup Instructions:</h4>
            </div>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          <div className="text-left space-y-3">
            <div className="space-y-2">
              <p className="text-sm text-gray-300 font-medium">1. Add Celo Alfajores Testnet to MetaMask:</p>
              <div className="bg-gray-800/50 rounded p-3 text-xs text-gray-300">
                <div>Network Name: <span className="text-blue-300">Celo Alfajores Testnet</span></div>
                <div>RPC URL: <span className="text-blue-300">https://alfajores-forno.celo-testnet.org</span></div>
                <div>Chain ID: <span className="text-blue-300">44787</span></div>
                <div>Currency Symbol: <span className="text-blue-300">CELO</span></div>
                <div>Block Explorer: <span className="text-blue-300">https://explorer.celo.org/alfajores</span></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-300 font-medium">2. Get test CELO tokens:</p>
              <a 
                href="https://faucet.celo.org/alfajores" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Visit Celo Alfajores Faucet</span>
              </a>
            </div>

            <div className="pt-2 border-t border-blue-500/30">
              <p className="text-xs text-gray-400">
                Make sure to switch to Celo Alfajores Testnet in MetaMask before connecting
              </p>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-300 text-sm">{error}</span>
        </div>
      )}
      
      <button
        onClick={connectWallet}
        disabled={isLoading}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? 'Connecting...' : 'Connect MetaMask'}
      </button>
      
      <p className="text-xs text-gray-400 mt-4">
        Make sure you have MetaMask installed and are on Celo Alfajores Testnet
      </p>
    </div>
  );
};