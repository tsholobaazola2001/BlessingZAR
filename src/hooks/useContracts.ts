import { useState, useEffect } from 'react';
import { useWeb3 } from './useWeb3';
import { BLESSING_ZAR_ABI, COMMUNITY_LENDING_ABI } from '../contracts/abis';
import { CONTRACTS } from '../contracts/config';

export const useContracts = () => {
  const { web3, account, isConnected } = useWeb3();
  const [tokenContract, setTokenContract] = useState<any>(null);
  const [lendingContract, setLendingContract] = useState<any>(null);
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [poolBalance, setPoolBalance] = useState<string>('0');
  const [userLoan, setUserLoan] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (web3 && isConnected) {
      try {
        const token = new web3.eth.Contract(BLESSING_ZAR_ABI, CONTRACTS.BLESSING_ZAR);
        const lending = new web3.eth.Contract(COMMUNITY_LENDING_ABI, CONTRACTS.COMMUNITY_LENDING);
        
        setTokenContract(token);
        setLendingContract(lending);
      } catch (error) {
        console.error('Error initializing contracts:', error);
      }
    }
  }, [web3, isConnected]);

  const refreshData = async () => {
    if (!tokenContract || !lendingContract || !account) return;

    try {
      // Get token balance
      const balance = await tokenContract.methods.balanceOf(account).call();
      setTokenBalance(web3?.utils.fromWei(balance, 'ether') || '0');

      // Get pool balance
      const pool = await lendingContract.methods.poolBalance().call();
      setPoolBalance(web3?.utils.fromWei(pool, 'ether') || '0');

      // Get user loan
      const loan = await lendingContract.methods.loans(account).call();
      setUserLoan(loan);

      // Check if user is admin
      const admin = await tokenContract.methods.admin().call();
      setIsAdmin(admin.toLowerCase() === account.toLowerCase());
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  useEffect(() => {
    refreshData();
  }, [tokenContract, lendingContract, account]);

  const mintTokens = async (to: string, amount: string) => {
    if (!tokenContract || !account) throw new Error('Contract not initialized');
    
    const amountWei = web3?.utils.toWei(amount, 'ether');
    return await tokenContract.methods.mint(to, amountWei).send({ from: account });
  };

  const lendTokens = async (amount: string) => {
    if (!tokenContract || !lendingContract || !account) throw new Error('Contract not initialized');
    
    const amountWei = web3?.utils.toWei(amount, 'ether');
    
    // First approve the lending contract to spend tokens
    await tokenContract.methods.approve(CONTRACTS.COMMUNITY_LENDING, amountWei).send({ from: account });
    
    // Then lend the tokens
    return await lendingContract.methods.lend(amountWei).send({ from: account });
  };

  const borrowTokens = async (amount: string) => {
    if (!lendingContract || !account) throw new Error('Contract not initialized');
    
    const amountWei = web3?.utils.toWei(amount, 'ether');
    return await lendingContract.methods.borrow(amountWei).send({ from: account });
  };

  const repayLoan = async () => {
    if (!tokenContract || !lendingContract || !account || !userLoan) throw new Error('Contract not initialized');
    
    // First approve the lending contract to spend tokens for repayment
    await tokenContract.methods.approve(CONTRACTS.COMMUNITY_LENDING, userLoan.due).send({ from: account });
    
    // Then repay the loan
    return await lendingContract.methods.repay().send({ from: account });
  };

  return {
    tokenContract,
    lendingContract,
    tokenBalance,
    poolBalance,
    userLoan,
    isAdmin,
    mintTokens,
    lendTokens,
    borrowTokens,
    repayLoan,
    refreshData
  };
};