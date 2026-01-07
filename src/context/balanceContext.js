"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
const BalanceContext = createContext(null);
import erc20Abi from '../MockUSDT.json';
import walletFactoryAbi from '../WalletFactory.json';
import { showErrorMessage, showInfoMessage } from '@/utilities/toast';
import { getToken } from '@/services/cookies';
import { useAccount, usePublicClient, useChainId, useSwitchChain } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { formatUnits } from 'viem';

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0.0);
  const [poolBalance, setPoolBalance] = useState('0');

  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const ensureSepolia = async () => {
    if (isConnected && chainId !== sepolia.id) {
      try {
        showInfoMessage('Switching network to Sepolia...');
        await switchChainAsync({ 
          chainId: sepolia.id,
          // Add fallback options for older wallet providers
          unsupported: false
        });
      } catch (e) {
        console.error("Chain switch error:", e);
        showErrorMessage('Please manually switch network to Sepolia (Chain ID: 11155111) and try again.');
        throw e;
      }
    }
  };

  const checkBalances = async () => {
    try {
      const token = getToken();
      if (!token) return; // don't proceed if token isn't there

      if (!isConnected || !address || !publicClient) {
        return;
      }

      // Ensure correct network
      await ensureSepolia();

      let tokenAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT;
      const walletFactoryAddress = process.env.NEXT_PUBLIC_WALLET_FACTORY;

      if (!walletFactoryAddress) {
        showErrorMessage('WalletFactory address is missing in environment variables');
        return;
      }

      // Ensure WalletFactory exists on the connected chain
      const factoryBytecode = await publicClient.getBytecode({ address: walletFactoryAddress });
      if (!factoryBytecode || factoryBytecode === '0x') {
        showErrorMessage(`Invalid WalletFactory address for chain ${chainId}: ${walletFactoryAddress}`);
        return;
      }

      // Resolve token address: use env if valid, otherwise fetch from factory.gameToken()
      let tokenBytecode = null;
      if (tokenAddress) {
        tokenBytecode = await publicClient.getBytecode({ address: tokenAddress });
      }
      if (!tokenAddress || !tokenBytecode || tokenBytecode === '0x') {
        try {
          const resolvedToken = await publicClient.readContract({
            address: walletFactoryAddress,
            abi: walletFactoryAbi.abi,
            functionName: 'gameToken',
          });
          tokenAddress = resolvedToken;
        } catch (e) {
          showErrorMessage('Failed to resolve game token address from WalletFactory');
          return;
        }

        const resolvedTokenBytecode = await publicClient.getBytecode({ address: tokenAddress });
        if (!resolvedTokenBytecode || resolvedTokenBytecode === '0x') {
          showErrorMessage(`Resolved token address is not a contract on chain ${chainId}: ${tokenAddress}`);
          return;
        }
      }

      const [mainWalletBalance, playerPoolBalance] = await Promise.all([
        publicClient.readContract({
          address: tokenAddress,
          abi: erc20Abi.abi,
          functionName: 'balanceOf',
          args: [address]
        }),
        publicClient.readContract({
          address: walletFactoryAddress,
          abi: walletFactoryAbi.abi,
          functionName: 'getPlayerBalance',
          args: [address]
        })
      ]);

      setBalance(formatUnits(mainWalletBalance, 6));
      setPoolBalance(formatUnits(playerPoolBalance, 6));

    } catch (error) {
      console.error('Error checking balances:', error);
      showErrorMessage('Failed to check balances: ' + (error?.message || String(error)));
    }
  };

  useEffect(() => {
    checkBalances(); // will internally skip if not connected/token not present

    const interval = setInterval(() => {
      checkBalances(); // will internally skip if not connected/token not present
    }, 2000);

    return () => clearInterval(interval);
  }, [isConnected, address, publicClient, chainId]);


  return (
    <BalanceContext.Provider value={{ balance, poolBalance, checkBalances }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);