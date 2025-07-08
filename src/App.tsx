import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WalletConnection } from './components/WalletConnection';
import { ContractSetup } from './components/ContractSetup';
import { UserDashboard } from './components/UserDashboard';
import { TokenMinting } from './components/TokenMinting';
import { LendingPool } from './components/LendingPool';
import { BorrowingInterface } from './components/BorrowingInterface';
import { useWeb3 } from './hooks/useWeb3';

function App() {
  const { isConnected } = useWeb3();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BlessingZAR
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A decentralized community lending platform built on Celo testnet. 
            Lend, borrow, and earn with our innovative stablecoin ecosystem.
          </p>
        </div>

        <ContractSetup />

        <div className="max-w-4xl mx-auto space-y-8">
          {!isConnected ? (
            <WalletConnection />
          ) : (
            <>
              <UserDashboard />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <TokenMinting />
                  <LendingPool />
                </div>
                <div>
                  <BorrowingInterface />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Connect Wallet</h3>
                <p className="text-gray-300 text-sm">
                  Connect your MetaMask wallet to the Celo testnet
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Lend or Borrow</h3>
                <p className="text-gray-300 text-sm">
                  Deposit tokens to earn interest or borrow against the pool
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Earn Rewards</h3>
                <p className="text-gray-300 text-sm">
                  Participate in the community and earn from lending activities
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;