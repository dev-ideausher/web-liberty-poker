"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import DepositeLoader from "@/components/DepositeLoader";
import ChooseRankTable from "@/modules/ChooseRankTable";
import HomeOptions from "@/modules/HomeOptions";
import { useRouter } from "next/navigation";
import RedCross from "@/icons/RedCross";
import Link from "next/link";
import { useAccount, useWalletClient, useChainId, useSwitchChain } from 'wagmi';
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { sepolia } from 'wagmi/chains';
import { BrowserProvider, ethers } from 'ethers';
import { showErrorMessage, showSuccessMessage, showInfoMessage } from '@/utilities/toast';
import erc20Abi from '@/MockUSDT.json';
import walletFactoryAbi from '@/WalletFactory.json';
import pokerPlayerWalletAbi from '@/pokerWallet.json';


export default function Page() {
  // ----------------------------
  // RANK STATE
  // ----------------------------
  const [selectedValue, setSelectedValue] = useState(6); 
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userBalance, setUserBalance] = useState('0');
  const [poolBalance, setPoolBalance] = useState('0');

  // ----------------------------
  // WAGMI HOOKS
  // ----------------------------
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { open } = useWeb3Modal();
  const router = useRouter();

  // ----------------------------
  // MOUNT HANDLER
  // ----------------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // ----------------------------
  // MAP AMOUNT → RANK NAME
  // ----------------------------
  const rankMap = {
    0: "HUMAN",
    6: "HUMAN",
    14: "RAT",
    35: "CAT",
    100: "DOG",
  };

  // ----------------------------
  // HANDLER FROM LOADER
  // ----------------------------
  const updateHandler = (value) => {
    // value will be string → convert to number
    const num = Number(value);

    if ([0, 6, 14, 35, 100].includes(num)) {
      setSelectedValue(num);
    } else {
      console.warn("Invalid rank received:", value);
    }
  };

  // ----------------------------
  // NETWORK VALIDATION
  // ----------------------------
  const ensureSepoliaNetwork = async () => {
    if (chainId !== sepolia.id) {
      try {
        showInfoMessage("Switching to Sepolia network...");
        await switchChainAsync({ chainId: sepolia.id });
        showSuccessMessage("Network switched to Sepolia");
      } catch (error) {
        console.error("Network switch error:", error);
        if (error.code === 4001) {
          showErrorMessage("Network switch cancelled by user");
        } else {
          showErrorMessage("Please manually switch to Sepolia network (Chain ID: 11155111)");
        }
        throw error;
      }
    }
  };

  // ----------------------------
  // ETHERJS PROVIDER
  // ----------------------------
  const getEthers = async () => {
    if (!window.ethereum) throw new Error("No wallet found");

    await ensureSepoliaNetwork();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    return { provider, signer };
  };

  // ----------------------------
  // CHECK BALANCES
  // ----------------------------
  const checkBalances = async () => {
    if (!mounted || !isConnected || !address) return;

    try {
      const { provider } = await getEthers();

      const tokenAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT;
      const walletFactoryAddress = process.env.NEXT_PUBLIC_WALLET_FACTORY;

      const tokenRead = new ethers.Contract(tokenAddress, erc20Abi.abi, provider);
      const walletFactoryRead = new ethers.Contract(walletFactoryAddress, walletFactoryAbi.abi, provider);

      const mainWalletBalance = await tokenRead.balanceOf(address);
      setUserBalance(ethers.formatUnits(mainWalletBalance, 6));

      const playerPoolBalance = await walletFactoryRead.getPlayerBalance(address);
      setPoolBalance(ethers.formatUnits(playerPoolBalance, 6));

    } catch (err) {
      console.error("Balance error:", err);
    }
  };

  useEffect(() => {
    if (mounted && isConnected && address) {
      checkBalances();
    }
  }, [mounted, isConnected, address, chainId]);

  // ----------------------------
  // DEPOSIT HANDLER
  // ----------------------------
  const depositHandler = async () => {
    if (!mounted || !isConnected || !address) {
      showErrorMessage("Connect wallet first");
      return;
    }

    if (selectedValue === 0) {
      showErrorMessage("Select a rank");
      return;
    }

    setLoading(true);

    try {
      const { provider, signer } = await getEthers();

      const tokenAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT;
      const walletFactoryAddress = process.env.NEXT_PUBLIC_WALLET_FACTORY;

      const tokenRead = new ethers.Contract(tokenAddress, erc20Abi.abi, provider);
      const tokenWrite = new ethers.Contract(tokenAddress, erc20Abi.abi, signer);

      const walletFactoryRead = new ethers.Contract(walletFactoryAddress, walletFactoryAbi.abi, provider);
      const walletFactoryWrite = new ethers.Contract(walletFactoryAddress, walletFactoryAbi.abi, signer);

      const depositAmountBN = ethers.parseUnits(selectedValue.toString(), 6);

      // 1. Get or create proxy wallet
      let playerProxyWallet = await walletFactoryRead.userWallets(address);

      if (playerProxyWallet === ethers.ZeroAddress) {
        const tx = await walletFactoryWrite.createWallet(address);
        const receipt = await tx.wait();
        const event = receipt.logs.find(l => l.fragment?.name === "WalletCreated");
        playerProxyWallet = event.args.wallet;
      }

      // 2. Check balance
      const userUSDTBalance = await tokenRead.balanceOf(address);
      if (userUSDTBalance < depositAmountBN) {
        throw new Error("Insufficient USDT");
      }

      // 3. Transfer to proxy if needed
      const proxyBalance = await tokenRead.balanceOf(playerProxyWallet);
      if (proxyBalance < depositAmountBN) {
        const tx = await tokenWrite.transfer(playerProxyWallet, depositAmountBN - proxyBalance);
        await tx.wait();
      }

      // 4. Approve
      const playerWalletContract = new ethers.Contract(playerProxyWallet, pokerPlayerWalletAbi.abi, signer);

      const allowance = await tokenRead.allowance(playerProxyWallet, walletFactoryAddress);
      if (allowance < depositAmountBN) {
        const tx = await playerWalletContract.approveERC20(tokenAddress, walletFactoryAddress, depositAmountBN);
        await tx.wait();
      }

      // 5. Deposit
      const tx = await walletFactoryWrite.depositToPool(address, depositAmountBN);
      await tx.wait();

      showSuccessMessage("Deposit successful!");
      router.push("/table-ready");

    } catch (err) {
      console.error(err);
      showErrorMessage(err.message || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };
  // ----------------------------
  // WALLET CONNECTION HANDLER
  // ----------------------------
  const handleConnectWallet = async () => {
    try {
      showInfoMessage("Opening wallet connection...");
      await open();
    } catch (error) {
      console.error("Error opening Web3Modal:", error);
      showErrorMessage("Failed to open wallet connection dialog");
    }
  };

  

  // ----------------------------
  // RENDER
  // ----------------------------
  return (
    <div className={`w-full min-h-screen relative`}>
      <img
        src="/images/banners/choose-rank.png"
        alt="bba"
        className="h-full absolute w-full object-cover z-10"
      />

      <div className="layout-container flex flex-col items-center pb-10 relative z-30">
        <div className="w-full flex items-center justify-between pt-5">
          <h2 className="normal-text-shadow text-[48px] uppercase font-normal font-bebas">
            Liberty Poker
          </h2>
          <Link href={"/watch-and-earn"}><RedCross/></Link>
        </div>

        <h1 className="text-[80px] text-primary font-black font-cinzel glow-shadow text-center leading-none">
          Choose your rank
        </h1>

        <h2 className="text-[32px] font-normal font-ruso text-center leading-[110%] mt-1 glow-shadow">
          Make a deposit to jump to a rank now <br /> Then play 100 hands in the
          tier to promote
        </h2>

        
        <ChooseRankTable variant={selectedValue} />
        <DepositeLoader updateHandler={updateHandler} targetPoint={selectedValue} />

        <div className="w-full">
          <Button
            variant={"outline-primary"}
            className={
              "w-fit mt-8 text-[32px] font-normal normal-text-shadow px-10 py-0.5"
            }
          >
            current
          </Button>
        </div>

        <div className="w-full mt-7 flex items-center justify-between">
          <div className="button-outline-primary px-10 py-2.5 w-fit pr-16 rounded-full">
            <h5 className="text-primary normal-text-shadow text-[32px] font-normal leading-snug">
              Selected rank:{" "}
              <span className="font-bold">
                {rankMap[selectedValue] || "-"}
              </span>
              <br />
              Required deposit:{" "}
              <span className="font-bold">{selectedValue}$</span>
            </h5>
          </div>

          {!isConnected ? (
            <Button 
              onClick={handleConnectWallet}
              className={"w-fit text-[48px] font-ruso font-normal"}
            >
              CONNECT WALLET
            </Button>
          ) : (
           
            <Button 
              onClick={depositHandler}
              loading={loading}
              disabled={selectedValue === 0 || loading}
              className={"w-fit text-[48px] font-ruso font-normal"}
            >
              {loading ? "PROCESSING..." : "DEPOSIT & UPGRADE"}
            </Button>
          )}
          
        </div>

        

        <HomeOptions />
      </div>
    </div>
  );
}