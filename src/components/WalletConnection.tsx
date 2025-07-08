import React from 'react';
import { Wallet, AlertCircle, Settings, ExternalLink } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

export const WalletConnection: React.FC = () => {
  const { account, isConnected, isLoading, error, connectWallet, disconnectWallet } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const addCeloTestnet = async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xAEF3', // 44787 in hex
          chainName: 'Celo Alfajores Testnet',
          nativeCurrency: {
            name: 'Celo',
            symbol: 'CELO',
            decimals: 18
          },
          rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
          blockExplorerUrls: ['https://explorer.celo.org/alfajores']
        }]
      });
    } catch (error) {
      console.error('Error adding Celo testnet:', error);
      throw error;
    }
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
        Connect your MetaMask wallet to start using BlessingZAR on Celo Alfajores Testnet
      </p>
      
      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Settings className="w-5 h-5 text-blue-400" />
          <h4 className="text-blue-300 font-semibold">Setup Requirements:</h4>
        </div>
        <div className="text-left space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-gray-300">MetaMask browser extension installed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-gray-300">Celo Alfajores Testnet added to MetaMask</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-gray-300">Test CELO tokens from faucet</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-blue-500/30 space-y-2">
          <button
            onClick={addCeloTestnet}
            className="w-full px-3 py-2 bg-blue-500/30 hover:bg-blue-500/40 text-blue-300 rounded-lg transition-colors text-sm"
          >
            Add Celo Testnet to MetaMask
          </button>
          <a 
            href="https://faucet.celo.org/alfajores" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">Get Test CELO from Faucet</span>
          </a>
        </div>
      </div>
      
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
        Make sure you have MetaMask installed and Celo Alfajores Testnet added
      </p>
    </div>
  );
};