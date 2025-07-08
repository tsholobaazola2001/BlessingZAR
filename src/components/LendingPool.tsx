import React, { useState } from 'react';
import { PiggyBank, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useContracts } from '../hooks/useContracts';

export const LendingPool: React.FC = () => {
  const { poolBalance, lendTokens, refreshData } = useContracts();
  const [lendAmount, setLendAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleLend = async () => {
    if (!lendAmount || parseFloat(lendAmount) <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    try {
      setIsLoading(true);
      setStatus({ type: null, message: '' });
      
      await lendTokens(lendAmount);
      await refreshData();
      
      setStatus({ type: 'success', message: 'Tokens lent successfully!' });
      setLendAmount('');
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Failed to lend tokens' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <PiggyBank className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-semibold text-white">Lending Pool</h3>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">Pool Balance</span>
          <span className="text-2xl font-bold text-green-400">{poolBalance} BZAR</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
            style={{ width: Math.min((parseFloat(poolBalance) / 1000) * 100, 100) + '%' }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount to Lend (BZAR)
          </label>
          <div className="relative">
            <input
              type="number"
              value={lendAmount}
              onChange={(e) => setLendAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <TrendingUp className="absolute right-3 top-3 w-5 h-5 text-green-400" />
          </div>
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
          onClick={handleLend}
          disabled={isLoading || !lendAmount}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'Lending...' : 'Lend to Pool'}
        </button>
      </div>
    </div>
  );
};