import React from 'react';
import { Wallet, TrendingUp, Activity, RefreshCw } from 'lucide-react';
import { useContracts } from '../hooks/useContracts';

export const UserDashboard: React.FC = () => {
  const { tokenBalance, poolBalance, userLoan, refreshData } = useContracts();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Dashboard</h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 text-gray-300 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Wallet className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-300">Your Balance</span>
          </div>
          <div className="text-2xl font-bold text-white">{tokenBalance} BZAR</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-300">Pool Balance</span>
          </div>
          <div className="text-2xl font-bold text-white">{poolBalance} BZAR</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-300">Loan Status</span>
          </div>
          <div className="text-lg font-bold text-white">
            {userLoan && userLoan.active ? 'Active' : 'None'}
          </div>
          {userLoan && userLoan.active && (
            <div className="text-sm text-gray-300 mt-1">
              Due: {parseFloat(userLoan.due / 1e18).toFixed(2)} BZAR
            </div>
          )}
        </div>
      </div>
    </div>
  );
};