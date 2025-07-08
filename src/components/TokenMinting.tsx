import React, { useState } from 'react';
import { Coins, AlertCircle, CheckCircle } from 'lucide-react';
import { useContracts } from '../hooks/useContracts';

export const TokenMinting: React.FC = () => {
  const { isAdmin, mintTokens, refreshData } = useContracts();
  const [mintAmount, setMintAmount] = useState('');
  const [mintAddress, setMintAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleMint = async () => {
    if (!mintAmount || !mintAddress) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    try {
      setIsLoading(true);
      setStatus({ type: null, message: '' });
      
      await mintTokens(mintAddress, mintAmount);
      await refreshData();
      
      setStatus({ type: 'success', message: 'Tokens minted successfully!' });
      setMintAmount('');
      setMintAddress('');
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Failed to mint tokens' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Coins className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-semibold text-white">Admin: Mint Tokens</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount (BZAR)
          </label>
          <input
            type="number"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {status.type && (
          <div className={`p-3 rounded-lg flex items-center space-x-2 ${
            status.type === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
          }`}>
            {status.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={`text-sm ${status.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>
              {status.message}
            </span>
          </div>
        )}

        <button
          onClick={handleMint}
          disabled={isLoading || !mintAmount || !mintAddress}
          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'Minting...' : 'Mint Tokens'}
        </button>
      </div>
    </div>
  );
};