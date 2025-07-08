import React, { useState } from 'react';
import { CreditCard, AlertCircle, CheckCircle, Calculator } from 'lucide-react';
import { useContracts } from '../hooks/useContracts';
import { useWeb3 } from '../hooks/useWeb3';

export const BorrowingInterface: React.FC = () => {
  const { web3 } = useWeb3();
  const { userLoan, borrowTokens, repayLoan, refreshData } = useContracts();
  const [borrowAmount, setBorrowAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const interestRate = 5; // 5% as defined in the contract

  const handleBorrow = async () => {
    if (!borrowAmount || parseFloat(borrowAmount) <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    try {
      setIsLoading(true);
      setStatus({ type: null, message: '' });
      
      await borrowTokens(borrowAmount);
      await refreshData();
      
      setStatus({ type: 'success', message: 'Tokens borrowed successfully!' });
      setBorrowAmount('');
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Failed to borrow tokens' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepay = async () => {
    try {
      setIsLoading(true);
      setStatus({ type: null, message: '' });
      
      await repayLoan();
      await refreshData();
      
      setStatus({ type: 'success', message: 'Loan repaid successfully!' });
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Failed to repay loan' });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateInterest = (amount: string) => {
    if (!amount) return 0;
    return (parseFloat(amount) * interestRate) / 100;
  };

  const formatAmount = (amount: string) => {
    return web3 ? parseFloat(web3.utils.fromWei(amount, 'ether')).toFixed(4) : '0';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <CreditCard className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Borrowing</h3>
      </div>

      {userLoan && userLoan.active ? (
        <div className="space-y-4">
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-yellow-300 mb-2">Active Loan</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Principal:</span>
                <span className="text-white font-medium">{formatAmount(userLoan.principal)} BZAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Amount Due:</span>
                <span className="text-yellow-300 font-medium">{formatAmount(userLoan.due)} BZAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Interest:</span>
                <span className="text-red-300 font-medium">
                  {(parseFloat(formatAmount(userLoan.due)) - parseFloat(formatAmount(userLoan.principal))).toFixed(4)} BZAR
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRepay}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Repaying...' : 'Repay Loan'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount to Borrow (BZAR)
            </label>
            <div className="relative">
              <input
                type="number"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calculator className="absolute right-3 top-3 w-5 h-5 text-blue-400" />
            </div>
          </div>

          {borrowAmount && (
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-300 mb-2">Loan Preview</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Principal:</span>
                  <span className="text-white font-medium">{borrowAmount} BZAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Interest ({interestRate}%):</span>
                  <span className="text-blue-300 font-medium">{calculateInterest(borrowAmount).toFixed(4)} BZAR</span>
                </div>
                <div className="flex justify-between border-t border-gray-600 pt-2">
                  <span className="text-gray-300">Total to Repay:</span>
                  <span className="text-yellow-300 font-medium">{(parseFloat(borrowAmount) + calculateInterest(borrowAmount)).toFixed(4)} BZAR</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleBorrow}
            disabled={isLoading || !borrowAmount}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Borrowing...' : 'Borrow Tokens'}
          </button>
        </div>
      )}

      {status.type && (
        <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
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
    </div>
  );
};