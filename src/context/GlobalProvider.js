import { BalanceProvider } from "./balanceContext";
import { WebSocketProvider } from "./socketContext";

const GlobalProviders = ({ children }) => {
    return (
        <WebSocketProvider>
            <BalanceProvider>
                {children}
            </BalanceProvider>
        </WebSocketProvider>
    );
};

export default GlobalProviders;
