"use client"
import Button from "@/components/Button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSignMessage, useChainId, useSwitchChain } from "wagmi";
import { useState, useEffect } from "react";
import { login, userVerification } from "@/services/apis/onboarding";
import { showErrorMessage, showSuccessMessage, showInfoMessage } from "@/utilities/toast";
import { removeToken, removeUserName, setBalance, setToken, setUserName } from "@/services/cookies";
import { sepolia } from "wagmi/chains";
import Poker from "@/hooks/Poker";
import { useRouter } from 'next/navigation'
import Exit from "@/icons/Exit";
import User from "@/icons/User";



// Utility function to add timeout to promises
const withTimeout = (promise, timeoutMs = 30000) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
        )
    ]);
};
export default function LoginModule({setLoggedIn}) {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const chainId = useChainId();
    const { switchChainAsync } = useSwitchChain();
    const [consent, setConsent] = useState(true);
    const [isConnecting, setIsConnecting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [onboardingComplete, setOnboardingComplete] = useState(false);
    const router = useRouter();
    const { authenticateSocket } = Poker()
    // This effect runs only on the client after hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const ensureSepoliaNetwork = async () => {
        // Check if we're in a PWA environment
        const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                    window.navigator.standalone || 
                    document.referrer.includes('android-app://');
        
        // In PWA environment, many mobile wallets handle network switching automatically
        // or have their own UX for network selection, so we'll be less aggressive
        if (chainId !== sepolia.id) {
        if (isPWA) {
            // For PWA, just show an informational message but don't force the switch
            showInfoMessage("Please ensure you're connected to Sepolia network (Chain ID: 11155111)");
            // Give a short delay for user to read the message
            await new Promise(resolve => setTimeout(resolve, 2000));
            return;
        } else {
            // For regular browser environments, try to switch automatically
            showInfoMessage("Switching to Sepolia network...");
            try {
            // Make sure we're using the correct chain ID format
            await switchChainAsync({ 
                chainId: sepolia.id,
                // Add fallback options for older wallet providers
                unsupported: false
            });
            } catch (e) {
            console.error("Chain switch error:", e);
            showErrorMessage("Network switch failed. Please manually switch to Sepolia (Chain ID: 11155111) and try again.");
            throw e;
            }
        }
        }
    };

    const handleWalletConnect = async () => {
        if (!consent) {
            showErrorMessage("Please provide your consent first.");
            return;
        }

        if (isConnecting) return;
        setIsConnecting(true);
        showInfoMessage("Starting verification process...");

        try {
            if (!address) {
                throw new Error("Wallet address not found");
            }

            // Ensure correct network for contract reads/writes
            await ensureSepoliaNetwork();

            console.log("🔄 Starting onboarding for address:", address);

            // Step 1: Verify user with backend (with timeout)
            console.log("📡 Calling userVerification API...");
            showInfoMessage("Verifying wallet address...");
            
            const verificationResponse = await withTimeout(
                userVerification({ walletAddress: address }),
                15000 // 15 second timeout
            );

            console.log("✅ Verification response:", verificationResponse);

            if (!verificationResponse.status) {
                throw new Error("Authentication failed. Please refresh the page and try again.");
            }

            const messageToSign = verificationResponse.data;
            console.log("📝 Message to sign:", messageToSign);

            // Step 2: Request signature (with timeout)
            console.log("🔐 Requesting signature from wallet...");
            showInfoMessage("Please sign the message in your wallet...");
            
            const signature = await withTimeout(
                signMessageAsync({ 
                message: messageToSign,
                account: address // Explicitly specify the account
                }),
                60000 // 60 second timeout for user interaction
            );
            
            console.log("✍️ Signature received:", signature);

            // Step 3: Login with signature (with timeout)
            console.log("🚀 Sending login request...");
            showInfoMessage("Completing authentication...");
            
            const loginResponse = await withTimeout(
                login({
                    walletAddress: address,
                    signature: signature,
                    consent: true
                }),
                15000 // 15 second timeout
            );

            console.log("🎯 Login response:", loginResponse);

            if (loginResponse.status) {
                console.log("🎉 Login successful!");
                showSuccessMessage("Wallet connected successfully!");
                
                // Set cookies
                setLoggedIn(true)
                setToken(loginResponse.data.token);
                setBalance(loginResponse.data.balance);
                setUserName(loginResponse.data.username);
                
                setOnboardingComplete(true);
                authenticateSocket()
                // Add a small delay to ensure state updates
                setTimeout(() => {
                    router.push("/choose-rank");
                }, 500);
            } else {
                throw new Error(loginResponse.message || "Login failed - invalid response from server");
            }

        } catch (error) {
        console.error('❌ Connection error:', error);
        
        // Handle specific error codes and types
        let errorMessage = "Connection failed. Please try again.";
        
        if (error.code === 4001 || error.name === 'UserRejectedRequestError') {
            errorMessage = "Signature rejected by user. Please try again.";
        } else if (error.code === -32002) {
            errorMessage = "Signature request pending. Please check your wallet.";
        } else if (error.message?.includes('User rejected')) {
            errorMessage = "Signature rejected. Please accept the signature request.";
        } else if (error.message?.includes('timeout')) {
            errorMessage = "Request timed out. Please try again.";
        } else if (error.message?.includes('network')) {
            errorMessage = "Network error. Please check your connection and try again.";
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showErrorMessage(errorMessage);
        
        // Only disconnect if it's a user rejection or critical error
        if (error.code === 4001 || error.name === 'UserRejectedRequestError') {
            disconnect();
        }
        
        setOnboardingComplete(false);
        } finally {
            setIsConnecting(false);
            console.log("🔄 Onboarding process completed, isConnecting set to false");
        }
    };

    const handleConnectClick = async () => {
        if (!consent) {
            showErrorMessage("Please provide your consent first.");
            return;
        }
        
        if (isConnected && address) {
            // If already onboarded, go to main
            if (onboardingComplete) {
                router.push("/choose-rank");
            }
        // If wallet is connected but onboarding not complete, it will auto-trigger via useEffect
        } else {
            // If not connected, open wallet modal
            open();
        }
    };

    // Reset onboarding state when wallet disconnects
    useEffect(() => {
        if (!isConnected) {
        setOnboardingComplete(false);
        setIsConnecting(false);
        }
    }, [isConnected]);

    // Auto-trigger onboarding when wallet connects
    useEffect(() => {
        if (mounted && isConnected && address && !onboardingComplete && !isConnecting && consent) {
        // Small delay to ensure wallet connection is fully established
        const timer = setTimeout(() => {
            handleWalletConnect();
        }, 1000);
        
        return () => clearTimeout(timer);
        }
    }, [mounted, isConnected, address, onboardingComplete, isConnecting, consent]);

    return (
        <div  className='red-gradient cursor-pointer left-[35%] flex items-center justify-center absolute size-[120px] rounded-full  flex-col'>
           {(mounted && isConnected) ? <div onClick={() => {
                  disconnect();
                  setOnboardingComplete(false);
                  removeToken()
                  removeUserName()
                }}><Exit/></div>: <div onClick={handleConnectClick} ><User /></div>  }
           
        </div>
    )
}
